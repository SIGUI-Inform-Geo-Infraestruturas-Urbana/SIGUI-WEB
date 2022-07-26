import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDistrictComponent } from './table-district.component';

describe('TableDistrictComponent', () => {
  let component: TableDistrictComponent;
  let fixture: ComponentFixture<TableDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
