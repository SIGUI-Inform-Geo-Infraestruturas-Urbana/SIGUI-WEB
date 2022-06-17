import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNetworkComponent } from './manager-network.component';

describe('ManagerNetworkComponent', () => {
  let component: ManagerNetworkComponent;
  let fixture: ComponentFixture<ManagerNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
