import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLayerComponent } from './open-layer.component';

describe('OpenLayerComponent', () => {
  let component: OpenLayerComponent;
  let fixture: ComponentFixture<OpenLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
