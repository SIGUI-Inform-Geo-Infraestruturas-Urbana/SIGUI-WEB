import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesCountyComponent } from './modal-files-county.component';

describe('ModalFilesCountyComponent', () => {
  let component: ModalFilesCountyComponent;
  let fixture: ComponentFixture<ModalFilesCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
