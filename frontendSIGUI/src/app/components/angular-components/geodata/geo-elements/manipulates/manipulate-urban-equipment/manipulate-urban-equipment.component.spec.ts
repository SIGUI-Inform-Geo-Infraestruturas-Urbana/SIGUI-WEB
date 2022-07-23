import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateUrbanEquipmentComponent } from './manipulate-urban-equipment.component';

describe('ManipulateUrbanEquipmentComponent', () => {
  let component: ManipulateUrbanEquipmentComponent;
  let fixture: ComponentFixture<ManipulateUrbanEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateUrbanEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateUrbanEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
