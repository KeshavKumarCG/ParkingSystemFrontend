import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTableComponent } from './car-table-valet.component';

describe('CarTableValetComponent', () => {
  let component: CarTableComponent;
  let fixture: ComponentFixture<CarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
