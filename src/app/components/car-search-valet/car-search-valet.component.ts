import { Component } from '@angular/core';
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
  selector: 'app-car-search-valet',
  templateUrl: './car-search-valet.component.html',
  styleUrls: ['./car-search-valet.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarSearchValetComponent {
  searchTerm: string = '';
  showRequestTable: boolean = false;
  cars: Car[] = [
    // Sample data, replace with your actual data or API call
    { id: '1', name: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', status: 'Parked' },
    { id: '2', name: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', status: 'Unparked' },
  ];

  onSearch() {
    // Implement your search logic here
    // This should filter the cars based on the searchTerm
    this.cars = this.cars.filter(car =>
      car.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleRequestTable() {
    this.showRequestTable = !this.showRequestTable;
  }

  toggleCarStatus(carId: string) {
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      car.status = car.status === 'Parked' ? 'Unparked' : 'Parked';
    }
  }
}
