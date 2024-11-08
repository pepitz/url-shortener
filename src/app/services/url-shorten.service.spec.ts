import { TestBed } from '@angular/core/testing';

import { UrlShortenService } from './url-shorten.service';

describe('UrlShortenService', () => {
  let service: UrlShortenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlShortenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
