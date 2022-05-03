import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MousePositionComponentComponent } from './mouse-position-component.component';

describe('MousePositionComponentComponent', () => {
  let component: MousePositionComponentComponent;
  let fixture: ComponentFixture<MousePositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MousePositionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MousePositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
