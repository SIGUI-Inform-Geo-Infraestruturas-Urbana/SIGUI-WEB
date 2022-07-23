import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDistrictComponent } from './container-district.component';

describe('ContainerDistrictComponent', () => {
  let component: ContainerDistrictComponent;
  let fixture: ComponentFixture<ContainerDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
