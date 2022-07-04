import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionUnitComponent } from './expansion-unit.component';

describe('ExpansionUnitComponent', () => {
  let component: ExpansionUnitComponent;
  let fixture: ComponentFixture<ExpansionUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
