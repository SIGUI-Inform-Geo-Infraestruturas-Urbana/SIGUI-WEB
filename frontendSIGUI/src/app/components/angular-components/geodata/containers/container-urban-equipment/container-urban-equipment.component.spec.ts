import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUrbanEquipmentComponent } from './container-urban-equipment.component';

describe('ContainerUrbanEquipmentComponent', () => {
  let component: ContainerUrbanEquipmentComponent;
  let fixture: ComponentFixture<ContainerUrbanEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUrbanEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerUrbanEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
