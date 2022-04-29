import { TestBed } from '@angular/core/testing';

import { FormatterCoordinatesService } from './formatter-coordinates.service';

describe('FormatterCoordinatesService', () => {
  let service: FormatterCoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatterCoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
