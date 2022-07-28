import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesStreetComponent } from './modal-files-street.component';

describe('ModalFilesStreetComponent', () => {
  let component: ModalFilesStreetComponent;
  let fixture: ComponentFixture<ModalFilesStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
