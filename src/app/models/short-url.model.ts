export interface ShortUrl {
  shortUrl: string;
  fullUrl: string;
  creationDate: string;
}

export interface ShortUrlSearchRequest {
  pageNumber: number;
  pageSize: number;
  term: string;
}

export interface ShortUrlCreationRequest {
  shortUrl: string;
  fullUrl: string;
  creationDate: string | Date;
}

export interface ShortUrlSearchResponse {
  hits: ShortUrl[];
  totalHits: number;
}
