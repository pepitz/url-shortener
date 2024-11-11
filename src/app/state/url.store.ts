import { computed, inject, DestroyRef } from '@angular/core';
import { of, from, EMPTY, pipe } from 'rxjs';
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
      hits().map(hit => ({
        shortUrlDetails: {
          shortUrl: `${predefinedShortAPIPath}${hit.shortUrl}`,
          fullUrl: hit.fullUrl,
        },
        creationDateToString: getRelativeTime(new Date(hit.creationDate)),
        shortUrl: hit.shortUrl,
        qrCodeData: hit.shortUrl,
      }))
    ),
  })),
  withHooks({
    onInit(store) {
      const urlShortenService = inject(UrlShortenService);
      const destroyRef = inject(DestroyRef);

      // Create an observable from the onDestroy event of DestroyRef
      const destroy$ = from(new Promise<void>(resolve => destroyRef.onDestroy(resolve)));

      const pageSize = 100;

      patchState(store, {
        isLoadingFind: true,
      });

      of({ pageNumber: 0, pageSize })
        .pipe(
          expand(({ pageNumber }) => {
            // Expand operator helps to recursively call the API for all pages
            return urlShortenService.findShortUrls({ pageNumber, pageSize, term: '' }).pipe(
              tapResponse({
                next: (response: ShortUrlSearchResponse) => {
                  patchState(store, {
                    hits: [...store.hits(), ...response.hits],
                    totalHits: response.totalHits,
                  });
                },
                error: (err: { status: number; message: string }) => {
                  console.error(`Error fetching short URLs: ${err.message}`);
                  patchState(store, {
                    isLoadingFind: false,
                  });
                },
              }),
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
            patchState(store, {
              isLoadingFind: false,
            });

            console.log('State after finalizing the fetch request:', {
              hits: store.hits(),
              totalHits: store.totalHits(),
              isLoadingFind: store.isLoadingFind(),
            });
          })
        )
        .subscribe();
    },
  }),
  withMethods((store, urlShortenService = inject(UrlShortenService), messageService = inject(MessageService)) => {
    const destroyRef = inject(DestroyRef);
    const destroy$ = from(new Promise<void>(resolve => destroyRef.onDestroy(resolve)));

    return {
      createShortUrl: rxMethod<ShortUrlCreationRequest>(
        pipe(
          tap(() =>
            patchState(store, {
              isLoadingCreate: true,
            })
          ),
          switchMap(request =>
            urlShortenService.createShortUrl(request).pipe(
              takeUntil(destroy$),
              tapResponse({
                next: shortUrl => {
                  patchState(store, {
                    hits: [...store.hits(), shortUrl],
                    totalHits: store.totalHits() + 1,
                  });
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
                finalize: () =>
                  patchState(store, {
                    isLoadingCreate: false,
                  }),
              })
            )
          )
        )
      ),
    };
  })
);
