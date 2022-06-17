import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerInfrastructureComponent } from './manager-infrastructure.component';

describe('ManagerInfrastructureComponent', () => {
  let component: ManagerInfrastructureComponent;
  let fixture: ComponentFixture<ManagerInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
