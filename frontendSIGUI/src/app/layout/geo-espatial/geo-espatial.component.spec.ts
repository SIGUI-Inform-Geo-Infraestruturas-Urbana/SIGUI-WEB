import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoEspatialComponent } from './geo-espatial.component';

describe('GeoEspatialComponent', () => {
  let component: GeoEspatialComponent;
  let fixture: ComponentFixture<GeoEspatialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoEspatialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoEspatialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
