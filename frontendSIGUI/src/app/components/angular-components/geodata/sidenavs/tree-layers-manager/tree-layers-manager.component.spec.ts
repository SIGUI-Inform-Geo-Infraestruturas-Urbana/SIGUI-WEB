import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLayersManagerComponent } from './tree-layers-manager.component';

describe('TreeLayersManagerComponent', () => {
  let component: TreeLayersManagerComponent;
  let fixture: ComponentFixture<TreeLayersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeLayersManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLayersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
