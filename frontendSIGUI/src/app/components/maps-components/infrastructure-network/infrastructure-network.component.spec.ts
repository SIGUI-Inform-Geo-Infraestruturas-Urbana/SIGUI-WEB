import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureNetworkComponent } from './infrastructure-network.component';

describe('InfrastructureNetworkComponent', () => {
  let component: InfrastructureNetworkComponent;
  let fixture: ComponentFixture<InfrastructureNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
