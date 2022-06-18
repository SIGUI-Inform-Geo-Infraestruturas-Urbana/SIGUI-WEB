import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationInfrastructuresComponent } from './association-infrastructures.component';

describe('AssociationInfrastructuresComponent', () => {
  let component: AssociationInfrastructuresComponent;
  let fixture: ComponentFixture<AssociationInfrastructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationInfrastructuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationInfrastructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
