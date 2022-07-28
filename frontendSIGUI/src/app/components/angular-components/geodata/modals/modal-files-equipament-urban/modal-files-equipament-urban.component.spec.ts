import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesEquipamentUrbanComponent } from './modal-files-equipament-urban.component';

describe('ModalFilesEquipamentUrbanComponent', () => {
  let component: ModalFilesEquipamentUrbanComponent;
  let fixture: ComponentFixture<ModalFilesEquipamentUrbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesEquipamentUrbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesEquipamentUrbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
