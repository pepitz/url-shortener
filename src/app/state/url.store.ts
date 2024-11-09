import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { ShortUrl, ShortUrlCreationRequest } from '../models/short-url.model';
import { UrlShortenService } from '../services/url-shorten.service';
import { MessageService } from 'primeng/api';

// Define the state type
interface UrlState {
  hits: ShortUrl[];
  isLoading: boolean;
}

// Initial state
const initialState: UrlState = {
  hits: [],
  isLoading: false,
};

// Create the signal store
export const UrlStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ hits }) => ({
    hitsCount: computed(() => hits().length),
  })),
  withMethods((store, urlShortenService = inject(UrlShortenService), messageService = inject(MessageService)) => ({
    createShortUrl: rxMethod<ShortUrlCreationRequest>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(request =>
          urlShortenService.createShortUrl(request).pipe(
            tapResponse({
              next: shortUrl => {
                patchState(store, { hits: [...store.hits(), shortUrl] });
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
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
  }))
);
