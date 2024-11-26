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
  private cars: Car[] = [];

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
