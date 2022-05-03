import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsMapComponent } from './forms-map.component';

describe('FormsMapComponent', () => {
  let component: FormsMapComponent;
  let fixture: ComponentFixture<FormsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
