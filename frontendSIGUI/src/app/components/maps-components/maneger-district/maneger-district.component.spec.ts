import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegerDistrictComponent } from './maneger-district.component';

describe('ManegerDistrictComponent', () => {
  let component: ManegerDistrictComponent;
  let fixture: ComponentFixture<ManegerDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManegerDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManegerDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
