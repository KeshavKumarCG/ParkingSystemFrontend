import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetLandingPageComponent } from './valet-landing-page.component';

describe('ValetLandingPageComponent', () => {
  let component: ValetLandingPageComponent;
  let fixture: ComponentFixture<ValetLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValetLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValetLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
