import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateCountyComponent } from './manipulate-county.component';

describe('ManipulateCountyComponent', () => {
  let component: ManipulateCountyComponent;
  let fixture: ComponentFixture<ManipulateCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
