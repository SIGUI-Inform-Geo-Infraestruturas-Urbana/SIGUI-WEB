import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateDistrictComponent } from './manipulate-district.component';

describe('ManipulateDistrictComponent', () => {
  let component: ManipulateDistrictComponent;
  let fixture: ComponentFixture<ManipulateDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
