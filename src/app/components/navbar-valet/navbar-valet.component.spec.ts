import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarValetComponent } from './navbar-valet.component';

describe('NavbarValetComponent', () => {
  let component: NavbarValetComponent;
  let fixture: ComponentFixture<NavbarValetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarValetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarValetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
