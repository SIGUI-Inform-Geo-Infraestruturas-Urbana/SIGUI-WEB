import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegerStateComponent } from './maneger-state.component';

describe('ManegerStateComponent', () => {
  let component: ManegerStateComponent;
  let fixture: ComponentFixture<ManegerStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManegerStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManegerStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
