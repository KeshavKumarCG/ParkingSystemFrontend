
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Car {
  carID: string;
  carModel: string;
  carNumber: string;
  phoneNumber: string;
  status: string;
}

@Component({
  selector: 'app-car-table-valet',
  templateUrl: './car-table-valet.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CarTableValetComponent implements OnInit {
toggleCarStatus(arg0: string) {
throw new Error('Method not implemented.');
}
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.http.get<Car[]>('http://localhost:5221/api/SearchFunctionality/combined')
      .subscribe(
        (data) => {
          this.cars = data;
          this.filteredCars = data;
        },
        (error) => {
          console.error('Error fetching cars:', error);
        }
      );
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.carID.toLowerCase().includes(searchTerm) ||
      car.carModel.toLowerCase().includes(searchTerm) ||
      car.carNumber.toLowerCase().includes(searchTerm) ||
      car.phoneNumber.toLowerCase().includes(searchTerm)
    );
  }
}
