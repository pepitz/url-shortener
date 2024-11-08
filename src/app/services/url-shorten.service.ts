import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../../assets/api/api';
import type {
  ShortUrlSearchRequest,
  ShortUrlSearchResponse,
  ShortUrlCreationRequest,
  ShortUrl,
} from '../models/short-url.model';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenService {
  private readonly apiUrl = baseURL;

  private http = inject(HttpClient);

  findShortUrls(request: ShortUrlSearchRequest): Observable<ShortUrlSearchResponse> {
    return this.http.post<ShortUrlSearchResponse>(`${this.apiUrl}/find`, request);
  }

  createShortUrl(request: ShortUrlCreationRequest): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(`${this.apiUrl}/create`, request);
  }
}
