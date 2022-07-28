import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesDistrictComponent } from './modal-files-district.component';

describe('ModalFilesDistrictComponent', () => {
  let component: ModalFilesDistrictComponent;
  let fixture: ComponentFixture<ModalFilesDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
