import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlEquipamenturbanComponent } from './popup-control-equipamenturban.component';

describe('PopupControlEquipamenturbanComponent', () => {
  let component: PopupControlEquipamenturbanComponent;
  let fixture: ComponentFixture<PopupControlEquipamenturbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlEquipamenturbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlEquipamenturbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
