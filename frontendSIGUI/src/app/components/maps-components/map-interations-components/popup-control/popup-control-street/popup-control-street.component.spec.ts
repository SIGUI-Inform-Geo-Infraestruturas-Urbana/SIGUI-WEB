import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlStreetComponent } from './popup-control-street.component';

describe('PopupControlStreetComponent', () => {
  let component: PopupControlStreetComponent;
  let fixture: ComponentFixture<PopupControlStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
