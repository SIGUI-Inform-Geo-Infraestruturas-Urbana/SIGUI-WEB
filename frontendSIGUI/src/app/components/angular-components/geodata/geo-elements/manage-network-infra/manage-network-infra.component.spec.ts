import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNetworkInfraComponent } from './manage-network-infra.component';

describe('ManageNetworkInfraComponent', () => {
  let component: ManageNetworkInfraComponent;
  let fixture: ComponentFixture<ManageNetworkInfraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNetworkInfraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNetworkInfraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
