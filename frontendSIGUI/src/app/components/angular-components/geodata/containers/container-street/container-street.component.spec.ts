import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerStreetComponent } from './container-street.component';

describe('ContainerStreetComponent', () => {
  let component: ContainerStreetComponent;
  let fixture: ComponentFixture<ContainerStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerStreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
