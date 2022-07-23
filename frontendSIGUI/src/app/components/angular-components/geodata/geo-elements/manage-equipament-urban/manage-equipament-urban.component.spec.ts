import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipamentUrbanComponent } from './manage-equipament-urban.component';

describe('ManageEquipamentUrbanComponent', () => {
  let component: ManageEquipamentUrbanComponent;
  let fixture: ComponentFixture<ManageEquipamentUrbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEquipamentUrbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEquipamentUrbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
