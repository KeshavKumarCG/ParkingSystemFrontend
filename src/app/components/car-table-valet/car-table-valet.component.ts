
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Car {
  carID: string;
  carModel: string;
  carNumber: string;
  phoneNumber: string;
  status: string; // Mapped status for display
  statusID: string; // Raw status ID from database
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
      .subscribe({
        next: (data) => {
          // Map the statusID to a user-friendly status for display
          this.cars = data.map(car => ({
            ...car,
            status: this.getStatusFromId(car.statusID) || 'Unknown', // Handle empty or unknown statusID
          }));
          this.filteredCars = this.cars;
        },
        error: (error) => {
          console.error('Error fetching cars:', error);
        },
      });
  }

  getStatusFromId(statusId: string): string {
    const statusMap: { [key: string]: string } = {
      'STATUS001': 'parked',
      'STATUS002': 'unparked',
      'STATUS003': 'in-transit',
    };
    return statusMap[statusId] || 'Unknown'; // Fallback to 'Unknown' if statusID is missing or invalid
  }

  getIdFromStatus(status: string): string {
    const reverseMap: { [key: string]: string } = {
      'parked': 'STATUS001',
      'unparked': 'STATUS002',
      'in-transit': 'STATUS003',
    };
    return reverseMap[status as keyof typeof reverseMap] || 'STATUS_UNKNOWN'; // Fallback for unmapped statuses
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
    this.searchTerm = '';
    this.filteredCars = this.cars;
  }

  toggleCarStatus(carID: string) {
    const car = this.cars.find(c => c.carID === carID);
    if (car) {
      const newStatus = car.status === 'parked' ? 'unparked' : 'parked';
      const newStatusId = this.getIdFromStatus(newStatus);

      // Send the PATCH request to update the car status based on either CarID or CarNumber
      const requestBody = {
        statusId: newStatusId,
        carID: carID,  // Use carID here as per the backend logic
        carNumber: car.carNumber  // Add carNumber in case we want to update using it
      };

      this.http.patch('http://localhost:5221/api/cars', requestBody).subscribe({
        next: () => {
          // Update car object locally
          car.status = newStatus;
          car.statusID = newStatusId;

          // Update filteredCars to reflect changes
          this.filteredCars = this.filteredCars.map(c =>
            c.carID === carID ? { ...car } : c
          );

          console.log('Car status updated successfully');
        },
        error: (error) => {
          console.error('Error updating car status:', error);
        }
      });
    }
  }
}
