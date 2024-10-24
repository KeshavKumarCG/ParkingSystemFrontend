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
  template: ``,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarSearchValetComponent {
  searchTerm: string = '';
  showRequestTable: boolean = false;
  cars: Car[] = [];
 
  onSearch() {
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
 