import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIterationsComponent } from './map-iterations.component';

describe('MapIterationsComponent', () => {
  let component: MapIterationsComponent;
  let fixture: ComponentFixture<MapIterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapIterationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapIterationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
