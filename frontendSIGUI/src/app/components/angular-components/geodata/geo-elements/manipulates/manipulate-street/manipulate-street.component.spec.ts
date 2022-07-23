import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateStreetComponent } from './manipulate-street.component';

describe('ManipulateStreetComponent', () => {
  let component: ManipulateStreetComponent;
  let fixture: ComponentFixture<ManipulateStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
