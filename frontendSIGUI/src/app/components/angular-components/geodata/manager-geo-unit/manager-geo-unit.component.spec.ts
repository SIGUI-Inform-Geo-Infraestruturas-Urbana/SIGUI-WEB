import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGeoUnitComponent } from './manager-geo-unit.component';

describe('ManagerGeoUnitComponent', () => {
  let component: ManagerGeoUnitComponent;
  let fixture: ComponentFixture<ManagerGeoUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerGeoUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGeoUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
