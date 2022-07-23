import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPublicPlaceComponent } from './container-public-place.component';

describe('ContainerPublicPlaceComponent', () => {
  let component: ContainerPublicPlaceComponent;
  let fixture: ComponentFixture<ContainerPublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerPublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
