import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  ShortUrl,
  ShortUrlCreationRequest,
  ShortUrlSearchRequest,
  ShortUrlSearchResponse,
} from '../models/short-url.model';
import { UrlShortenService } from '../services/url-shorten.service';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { predefinedShortAPIPath } from '../../assets/api/api';

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

// Utility function to calculate relative time string
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'less than an hour ago';
  } else if (diffInHours === 1) {
    return 'about an hour ago';
  } else if (diffInHours <= 48) {
    return 'as of now';
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `about ${diffInDays} days ago...`;
  }
}

export const UrlStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ hits, totalHits }) => ({
    hitsCount: computed(() => hits().length),
    totalHitsCount: computed(() => totalHits()),
    // Computed signal for table data
    urlData: computed(() =>
      hits().map(hit => ({
        shortUrlDetails: {
          shortUrl: `${predefinedShortAPIPath}${hit.shortUrl}`,
          fullUrl: hit.fullUrl,
        },
        creationDateToString: getRelativeTime(new Date(hit.creationDate)),
        shortUrl: hit.shortUrl,
        qrCodeData: hit.shortUrl, // Use shortUrl as the data for generating QR code
      }))
    ),
  })),
  withHooks({
    onInit(store) {
      const urlShortenService = inject(UrlShortenService);

      const searchRequest: ShortUrlSearchRequest = {
        pageNumber: 0,
        pageSize: 10,
        term: '',
      };

      patchState(store, {
        isLoadingFind: true,
      });

      urlShortenService
        .findShortUrls(searchRequest)
        .pipe(
          takeUntilDestroyed(),
          tapResponse({
            next: (response: ShortUrlSearchResponse) => {
              patchState(store, {
                hits: [...response.hits],
                totalHits: response.totalHits,
              });

              console.log('State after fetching short URLs:', {
                hits: store.hits(),
                totalHits: store.totalHits(),
                isLoadingFind: store.isLoadingFind(),
              });
            },
            error: (err: { status: number; message: string }) => {
              console.error(`Error fetching short URLs: ${err.message}`);
            },
            finalize: () => {
              patchState(store, {
                isLoadingFind: false,
              });

              console.log('State after finalizing the fetch request:', {
                hits: store.hits(),
                totalHits: store.totalHits(),
                isLoadingFind: store.isLoadingFind(),
              });
            },
          })
        )
        .subscribe();
    },
  }),
  withMethods((store, urlShortenService = inject(UrlShortenService), messageService = inject(MessageService)) => ({
    createShortUrl: rxMethod<ShortUrlCreationRequest>(
      pipe(
        tap(() =>
          patchState(store, {
            isLoadingCreate: true,
          })
        ),
        switchMap(request =>
          urlShortenService.createShortUrl(request).pipe(
            takeUntilDestroyed(),
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
  }))
);
