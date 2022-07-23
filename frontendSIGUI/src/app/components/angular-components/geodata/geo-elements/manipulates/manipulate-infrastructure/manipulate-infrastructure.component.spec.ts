import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateInfrastructureComponent } from './manipulate-infrastructure.component';

describe('ManipulateInfrastructureComponent', () => {
  let component: ManipulateInfrastructureComponent;
  let fixture: ComponentFixture<ManipulateInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManipulateInfrastructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManipulateInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
