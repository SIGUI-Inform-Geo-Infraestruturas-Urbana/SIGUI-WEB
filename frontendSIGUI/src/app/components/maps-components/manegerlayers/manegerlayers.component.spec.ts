import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegerlayersComponent } from './manegerlayers.component';

describe('ManegerlayersComponent', () => {
  let component: ManegerlayersComponent;
  let fixture: ComponentFixture<ManegerlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManegerlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManegerlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
