import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlPublicplaceComponent } from './popup-control-publicplace.component';

describe('PopupControlPublicplaceComponent', () => {
  let component: PopupControlPublicplaceComponent;
  let fixture: ComponentFixture<PopupControlPublicplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupControlPublicplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlPublicplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
