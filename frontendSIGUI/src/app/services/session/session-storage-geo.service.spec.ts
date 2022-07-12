import { TestBed } from '@angular/core/testing';

import { SessionStorageGeoService } from './session-storage-geo.service';

describe('SessionStorageGeoService', () => {
  let service: SessionStorageGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
