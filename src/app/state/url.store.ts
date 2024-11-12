import { computed, inject, DestroyRef } from '@angular/core';
import { of, from, pipe, EMPTY } from 'rxjs';
import { switchMap, tap, expand, takeUntil, finalize } from 'rxjs/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { ShortUrl, ShortUrlCreationRequest, ShortUrlSearchResponse } from '../models/short-url.model';
import { UrlShortenService } from '../services/url-shorten.service';
import { MessageService } from 'primeng/api';
import { predefinedShortAPIPath } from '../../assets/api/api';
import { getRelativeTime } from '../utils';

interface UrlState {
  hits: ShortUrl[];
  totalHits: number;
  isLoadingCreate: boolean;
  isLoadingFind: boolean;
}

const initialState: UrlState = {
  hits: [],
  totalHits: 0,
  isLoadingCreate: false,
  isLoadingFind: false,
};

export const UrlStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ hits, totalHits }) => ({
    hitsCount: computed(() => hits().length),
    totalHitsCount: computed(() => totalHits()),
    urlData: computed(() =>
      hits().map(hit => {
        const fullUrl = hit.fullUrl.startsWith('http') ? hit.fullUrl : `https://${hit.fullUrl}`;

        return {
          shortUrlDetails: {
            shortUrl: `${predefinedShortAPIPath}${hit.shortUrl}`,
            fullUrl: fullUrl,
          },
          creationDateToString: getRelativeTime(new Date(hit.creationDate)),
          shortUrl: hit.shortUrl,
          qrCodeData: encodeURI(fullUrl),
        };
      })
    ),
  })),
  withMethods(store => ({
    _setUrlHits(updatedHits: ShortUrl[], updatedTotalHits: number) {
      patchState(store, {
        hits: [...updatedHits],
        totalHits: updatedTotalHits,
      });
    },
    _setLoadingCreate(status: boolean) {
      patchState(store, {
        isLoadingCreate: status,
      });
    },
    _setLoadingFind(status: boolean) {
      patchState(store, {
        isLoadingFind: status,
      });
    },
  })),
  withMethods(
    (
      store,
      urlShortenService = inject(UrlShortenService),
      messageService = inject(MessageService),
      destroyRef = inject(DestroyRef),
      destroy$ = from(new Promise<void>(resolve => destroyRef.onDestroy(resolve)))
    ) => ({
      createShortUrl: rxMethod<ShortUrlCreationRequest>(
        pipe(
          tap(() => store._setLoadingCreate(true)),
          switchMap(request =>
            urlShortenService.createShortUrl(request).pipe(
              takeUntil(destroy$),
              tapResponse({
                next: shortUrl => {
                  const updatedHits = [...store.hits(), shortUrl];
                  updatedHits.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());

                  store._setUrlHits(updatedHits, updatedHits.length);

                  messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Short URL created successfully!',
                    sticky: true,
                  });
                },
                error: (err: { status: number; message: string }) => {
                  console.error(`Error creating short URL: ${err.message}`);
                  messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to create short URL: ${err.message}`,
                    sticky: true,
                  });
                },
                finalize: () => store._setLoadingCreate(false),
              })
            )
          )
        )
      ),
      fetchAllRecords: rxMethod<{ pageNumber: number; pageSize: number }>(
        pipe(
          tap(() => store._setLoadingFind(true)),
          expand(({ pageNumber, pageSize }) => {
            // Fetch a page of URLs from the service
            return urlShortenService.findShortUrls({ pageNumber, pageSize, term: '' }).pipe(
              tapResponse({
                next: (response: ShortUrlSearchResponse) => {
                  const updatedHitsWithResponse = [...store.hits(), ...response.hits];
                  store._setUrlHits(updatedHitsWithResponse, response.totalHits);
                },
                error: (err: { status: number; message: string }) => {
                  console.error(`Error fetching short URLs: ${err.message}`);
                  store._setLoadingFind(false);
                },
              }),
              // Continue if there are more pages to load
              switchMap((response: ShortUrlSearchResponse) => {
                if ((pageNumber + 1) * pageSize < response.totalHits) {
                  return of({ pageNumber: pageNumber + 1, pageSize });
                } else {
                  return EMPTY;
                }
              })
            );
          }),
          takeUntil(destroy$),
          finalize(() => {
            store._setLoadingFind(false);
            console.log('State after finalizing the fetch request:', {
              hits: store.hits(),
              totalHits: store.totalHits(),
              isLoadingFind: store.isLoadingFind(),
            });
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      store.fetchAllRecords({ pageNumber: 0, pageSize: 100 });
    },
  })
);
