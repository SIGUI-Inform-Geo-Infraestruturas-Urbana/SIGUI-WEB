import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateUnitComponent } from './manipulate-unit.component';

describe('ManipulateUnitComponent', () => {
  let component: ManipulateUnitComponent;
  let fixture: ComponentFixture<ManipulateUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
