import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesPublicPlaceComponent } from './modal-files-public-place.component';

describe('ModalFilesPublicPlaceComponent', () => {
  let component: ModalFilesPublicPlaceComponent;
  let fixture: ComponentFixture<ModalFilesPublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesPublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesPublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
