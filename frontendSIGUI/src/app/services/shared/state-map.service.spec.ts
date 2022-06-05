import { TestBed } from '@angular/core/testing';

import { StateMapService } from './state-map.service';

describe('StateMapService', () => {
  let service: StateMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
