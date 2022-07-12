import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlInfrastructureComponent } from './popup-control-infrastructure.component';

describe('PopupControlInfrastructureComponent', () => {
  let component: PopupControlInfrastructureComponent;
  let fixture: ComponentFixture<PopupControlInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
