import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlDistrictsComponent } from './popup-control-districts.component';

describe('PopupControlDistrictsComponent', () => {
  let component: PopupControlDistrictsComponent;
  let fixture: ComponentFixture<PopupControlDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlDistrictsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
