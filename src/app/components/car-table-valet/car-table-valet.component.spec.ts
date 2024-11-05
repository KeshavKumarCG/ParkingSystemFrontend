import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarTableValetComponent } from './car-table-valet.component';

describe('CarTableValetComponent', () => {
  let component: CarTableValetComponent;
  let fixture: ComponentFixture<CarTableValetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarTableValetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTableValetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
