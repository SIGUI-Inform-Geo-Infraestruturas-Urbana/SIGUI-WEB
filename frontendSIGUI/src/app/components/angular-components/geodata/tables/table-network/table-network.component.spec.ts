import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNetworkComponent } from './table-network.component';

describe('TableNetworkComponent', () => {
  let component: TableNetworkComponent;
  let fixture: ComponentFixture<TableNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
