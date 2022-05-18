import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavheadersiguiComponent } from './navheadersigui.component';

describe('NavheadersiguiComponent', () => {
  let component: NavheadersiguiComponent;
  let fixture: ComponentFixture<NavheadersiguiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavheadersiguiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavheadersiguiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
