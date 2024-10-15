import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Car {
  id: string;
  name: string;
  licensePlate: string;
  userPhone: string;
  status: 'Parked' | 'Unparked';
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  searchCars(searchTerm: string) {
    throw new Error('Method not implemented.');
  }
  search(searchTerm: string) {
    throw new Error('Method not implemented.');
  }
  private cars: Car[] = [
    { id: 'CAR001', name: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', status: 'Parked' },
    { id: 'CAR002', name: 'Honda Civic', licensePlate: 'DEF456', userPhone: '234-567-8901', status: 'Unparked' },
     ];

  private showRequestsSubject = new BehaviorSubject<boolean>(false);
  showRequests$ = this.showRequestsSubject.asObservable();

  getCars(): Car[] {
    return this.cars;
  }

  toggleCarStatus(carId: string): void {
    this.cars = this.cars.map(car =>
      car.id === carId
        ? { ...car, status: car.status === 'Parked' ? 'Unparked' : 'Parked' }
        : car
    );
  }

  toggleShowRequests(): void {
    this.showRequestsSubject.next(!this.showRequestsSubject.value);
  }
}
