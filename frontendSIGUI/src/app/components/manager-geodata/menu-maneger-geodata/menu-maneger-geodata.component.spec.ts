import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManegerGeodataComponent } from './menu-maneger-geodata.component';

describe('MenuManegerGeodataComponent', () => {
  let component: MenuManegerGeodataComponent;
  let fixture: ComponentFixture<MenuManegerGeodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuManegerGeodataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManegerGeodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
