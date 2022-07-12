import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlUnitComponent } from './popup-control-unit.component';

describe('PopupControlUnitComponent', () => {
  let component: PopupControlUnitComponent;
  let fixture: ComponentFixture<PopupControlUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
