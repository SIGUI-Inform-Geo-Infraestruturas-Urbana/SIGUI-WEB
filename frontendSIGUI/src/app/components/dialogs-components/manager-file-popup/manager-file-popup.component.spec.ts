import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFilePopupComponent } from './manager-file-popup.component';

describe('ManagerFilePopupComponent', () => {
  let component: ManagerFilePopupComponent;
  let fixture: ComponentFixture<ManagerFilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerFilePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerFilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
