import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInfrastructureComponent } from './container-infrastructure.component';

describe('ContainerInfrastructureComponent', () => {
  let component: ContainerInfrastructureComponent;
  let fixture: ComponentFixture<ContainerInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
