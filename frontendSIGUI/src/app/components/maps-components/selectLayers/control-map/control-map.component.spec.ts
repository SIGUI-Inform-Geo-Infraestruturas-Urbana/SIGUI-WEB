import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMapComponent } from './control-map.component';

describe('ControlMapComponent', () => {
  let component: ControlMapComponent;
  let fixture: ComponentFixture<ControlMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
