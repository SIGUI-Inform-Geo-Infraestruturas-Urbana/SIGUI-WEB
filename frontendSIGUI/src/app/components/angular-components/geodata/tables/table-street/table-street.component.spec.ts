import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStreetComponent } from './table-street.component';

describe('TableStreetComponent', () => {
  let component: TableStreetComponent;
  let fixture: ComponentFixture<TableStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
