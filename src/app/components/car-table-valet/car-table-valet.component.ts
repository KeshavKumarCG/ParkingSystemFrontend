

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Car {
//   id: string;
//   name: string;
//   licensePlate: string;
//   userPhone: string;
//   status: 'Parked' | 'Unparked';
// }

// @Component({
//   selector: 'app-car-table-valet',
//   templateUrl: './car-table-valet.component.html',
//   styleUrls: ['./car-table-valet.component.scss'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class CarTableValetComponent implements OnInit {
//   searchTerm: string = '';
//   cars: Car[] = [];
//   filteredCars: Car[] = [];
// columns: any;

//   ngOnInit() {
//     // Initialize your cars array here or fetch from a service
//     this.cars = [
//       { id: '1', name: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', status: 'Parked' },
//       { id: '2', name: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', status: 'Unparked' },
//     ];
//     this.filteredCars = this.cars;
//   }

//   onSearch() {
//     this.filteredCars = this.cars.filter(car =>
//       car.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       car.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       car.licensePlate.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   toggleCarStatus(carId: string) {
//     const car = this.cars.find(c => c.id === carId);
//     if (car) {
//       car.status = car.status === 'Parked' ? 'Unparked' : 'Parked';
//     }
//     this.onSearch(); // Refresh the filtered list
//   }
// }





import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
})
export class CarTableValetComponent implements OnInit {
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

  onSearch() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter(car =>
      car.carID.toLowerCase().includes(searchTerm) ||
      car.carModel.toLowerCase().includes(searchTerm) ||
      car.carNumber.toLowerCase().includes(searchTerm) ||
      car.phoneNumber.toLowerCase().includes(searchTerm)
    );
  }

  clearSearch() {
    this.searchTerm = '';  // Clear the search term
    this.filteredCars = this.cars; // Reset the filtered cars to show all
  }

  toggleCarStatus(carID: string) {
    const car = this.cars.find(c => c.carID === carID);
    if (car) {
      car.status = car.status === 'parked' ? 'unparked' : 'parked';
      this.updateCarStatus(car);
    }
  }

  updateCarStatus(car: Car) {
    this.http.put(`http://localhost:5221/api/SearchFunctionality/updateStatus/${car.carID}`, { status: car.status })
      .subscribe(
        () => {
          console.log('Car status updated successfully');
        },
        (error) => {
          console.error('Error updating car status:', error);
        }
      );
  }
}
