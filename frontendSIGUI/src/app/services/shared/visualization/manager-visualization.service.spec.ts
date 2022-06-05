import { TestBed } from '@angular/core/testing';

import { ManagerVisualizationService } from './manager-visualization.service';

describe('ManagerVisualizationService', () => {
  let service: ManagerVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
