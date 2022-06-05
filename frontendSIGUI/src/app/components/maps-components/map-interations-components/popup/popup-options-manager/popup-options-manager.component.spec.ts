import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOptionsManagerComponent } from './popup-options-manager.component';

describe('PopupOptionsManagerComponent', () => {
  let component: PopupOptionsManagerComponent;
  let fixture: ComponentFixture<PopupOptionsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupOptionsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOptionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
