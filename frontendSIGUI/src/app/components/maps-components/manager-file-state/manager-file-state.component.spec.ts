import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFileStateComponent } from './manager-file-state.component';

describe('ManagerFileStateComponent', () => {
  let component: ManagerFileStateComponent;
  let fixture: ComponentFixture<ManagerFileStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerFileStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerFileStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
