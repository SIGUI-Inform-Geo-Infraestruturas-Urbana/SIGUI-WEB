import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCountyComponent } from './container-county.component';

describe('ContainerCountyComponent', () => {
  let component: ContainerCountyComponent;
  let fixture: ComponentFixture<ContainerCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
