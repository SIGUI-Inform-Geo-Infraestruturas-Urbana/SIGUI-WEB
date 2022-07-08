import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavGeodataComponent } from './sidenav-geodata.component';

describe('SidenavGeodataComponent', () => {
  let component: SidenavGeodataComponent;
  let fixture: ComponentFixture<SidenavGeodataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavGeodataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavGeodataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
