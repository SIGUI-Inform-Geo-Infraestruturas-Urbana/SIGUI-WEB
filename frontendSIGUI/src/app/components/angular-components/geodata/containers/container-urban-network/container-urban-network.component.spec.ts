import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUrbanNetworkComponent } from './container-urban-network.component';

describe('ContainerUrbanNetworkComponent', () => {
  let component: ContainerUrbanNetworkComponent;
  let fixture: ComponentFixture<ContainerUrbanNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUrbanNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerUrbanNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
