import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUnitComponent } from './container-unit.component';

describe('ContainerUnitComponent', () => {
  let component: ContainerUnitComponent;
  let fixture: ComponentFixture<ContainerUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
