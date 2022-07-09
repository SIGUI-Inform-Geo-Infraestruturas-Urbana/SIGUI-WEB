import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCountyComponent } from './table-county.component';

describe('TableCountyComponent', () => {
  let component: TableCountyComponent;
  let fixture: ComponentFixture<TableCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
