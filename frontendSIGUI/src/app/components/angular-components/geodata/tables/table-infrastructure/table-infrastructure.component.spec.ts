import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfrastructureComponent } from './table-infrastructure.component';

describe('TableInfrastructureComponent', () => {
  let component: TableInfrastructureComponent;
  let fixture: ComponentFixture<TableInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
