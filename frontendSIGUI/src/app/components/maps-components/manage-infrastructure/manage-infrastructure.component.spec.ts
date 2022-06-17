import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInfrastructureComponent } from './manage-infrastructure.component';

describe('ManageInfrastructureComponent', () => {
  let component: ManageInfrastructureComponent;
  let fixture: ComponentFixture<ManageInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
