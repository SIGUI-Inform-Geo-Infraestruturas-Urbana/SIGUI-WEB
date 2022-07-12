import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlDistrictComponent } from './popup-control-district.component';

describe('PopupControlDistrictComponent', () => {
  let component: PopupControlDistrictComponent;
  let fixture: ComponentFixture<PopupControlDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
