import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicPlaceComponent } from './manage-public-place.component';

describe('ManagePublicPlaceComponent', () => {
  let component: ManagePublicPlaceComponent;
  let fixture: ComponentFixture<ManagePublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
