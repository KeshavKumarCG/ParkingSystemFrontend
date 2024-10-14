import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetinfopageComponent } from './valetinfopage.component';

describe('ValetinfopageComponent', () => {
  let component: ValetinfopageComponent;
  let fixture: ComponentFixture<ValetinfopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValetinfopageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValetinfopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
