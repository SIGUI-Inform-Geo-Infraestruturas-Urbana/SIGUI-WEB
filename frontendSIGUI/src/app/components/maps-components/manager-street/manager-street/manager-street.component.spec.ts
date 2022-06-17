import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStreetComponent } from './manager-street.component';

describe('ManagerStreetComponent', () => {
  let component: ManagerStreetComponent;
  let fixture: ComponentFixture<ManagerStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
