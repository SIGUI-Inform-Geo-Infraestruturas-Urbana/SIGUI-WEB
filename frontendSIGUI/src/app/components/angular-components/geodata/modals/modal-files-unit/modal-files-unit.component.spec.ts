import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesUnitComponent } from './modal-files-unit.component';

describe('ModalFilesUnitComponent', () => {
  let component: ModalFilesUnitComponent;
  let fixture: ComponentFixture<ModalFilesUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFilesUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
