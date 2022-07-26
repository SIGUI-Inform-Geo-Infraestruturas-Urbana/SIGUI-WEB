import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePublicPlaceComponent } from './table-public-place.component';

describe('TablePublicPlaceComponent', () => {
  let component: TablePublicPlaceComponent;
  let fixture: ComponentFixture<TablePublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
