import { TestBed } from '@angular/core/testing';

import { CountyManipulationService } from './county-manipulation.service';

describe('CountyManipulationService', () => {
  let service: CountyManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountyManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
