import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEquipamentComponent } from './table-equipament.component';

describe('TableEquipamentComponent', () => {
  let component: TableEquipamentComponent;
  let fixture: ComponentFixture<TableEquipamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEquipamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEquipamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
