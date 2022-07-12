import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlCountyComponent } from './popup-control-county.component';

describe('PopupControlCountyComponent', () => {
  let component: PopupControlCountyComponent;
  let fixture: ComponentFixture<PopupControlCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
