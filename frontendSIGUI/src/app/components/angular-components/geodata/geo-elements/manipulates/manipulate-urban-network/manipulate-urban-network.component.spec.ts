import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateUrbanNetworkComponent } from './manipulate-urban-network.component';

describe('ManipulateUrbanNetworkComponent', () => {
  let component: ManipulateUrbanNetworkComponent;
  let fixture: ComponentFixture<ManipulateUrbanNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateUrbanNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateUrbanNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
