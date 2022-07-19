import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodataManagerComponent } from './geodata-manager.component';

describe('GeodataManagerComponent', () => {
  let component: GeodataManagerComponent;
  let fixture: ComponentFixture<GeodataManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeodataManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeodataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
