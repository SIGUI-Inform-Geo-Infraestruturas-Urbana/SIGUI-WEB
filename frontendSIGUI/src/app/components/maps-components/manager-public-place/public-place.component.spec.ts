import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPlaceComponent } from './public-place.component';

describe('PublicPlaceComponent', () => {
  let component: PublicPlaceComponent;
  let fixture: ComponentFixture<PublicPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
