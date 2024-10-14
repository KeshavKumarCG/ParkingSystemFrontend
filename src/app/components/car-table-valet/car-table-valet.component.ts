

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Car {
  id: string;
  name: string;
  licensePlate: string;
  userPhone: string;
  status: 'Parked' | 'Unparked';
}

@Component({
  selector: 'app-car-table-valet',
  templateUrl: './car-table-valet.component.html',
  styleUrls: ['./car-table-valet.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarTableValetComponent implements OnInit {
  searchTerm: string = '';
  cars: Car[] = [];
  filteredCars: Car[] = [];
columns: any;

  ngOnInit() {
    // Initialize your cars array here or fetch from a service
    this.cars = [
      { id: '1', name: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', status: 'Parked' },
      { id: '2', name: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', status: 'Unparked' },
    ];
    this.filteredCars = this.cars;
  }

  onSearch() {
    this.filteredCars = this.cars.filter(car =>
      car.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleCarStatus(carId: string) {
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      car.status = car.status === 'Parked' ? 'Unparked' : 'Parked';
    }
    this.onSearch(); // Refresh the filtered list
  }
}
