import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedLoginPageComponent } from './unauthorised-login-page.component';

describe('UnauthorisedLoginPageComponent', () => {
  let component: UnauthorisedLoginPageComponent;
  let fixture: ComponentFixture<UnauthorisedLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorisedLoginPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorisedLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
