import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStreetComponent } from './manage-street.component';

describe('ManageStreetComponent', () => {
  let component: ManageStreetComponent;
  let fixture: ComponentFixture<ManageStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
