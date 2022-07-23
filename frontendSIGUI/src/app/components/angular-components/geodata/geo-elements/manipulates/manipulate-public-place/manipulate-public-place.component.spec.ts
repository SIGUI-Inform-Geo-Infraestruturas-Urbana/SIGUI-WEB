import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulatePublicPlaceComponent } from './manipulate-public-place.component';

describe('ManipulatePublicPlaceComponent', () => {
  let component: ManipulatePublicPlaceComponent;
  let fixture: ComponentFixture<ManipulatePublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulatePublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulatePublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
