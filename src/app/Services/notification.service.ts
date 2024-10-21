import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Store the notification count as a BehaviorSubject to allow for reactivity.
  private notificationCountSource = new BehaviorSubject<number>(0);
  
  // This is an observable that components will subscribe to in order to react to count changes.
  notificationCount$ = this.notificationCountSource.asObservable();

  constructor() {}

  // Method to increase the count
  increaseNotificationCount() {
    const currentCount = this.notificationCountSource.value;
    console.log('Current notification count:', currentCount);  // Add this for debugging
    this.notificationCountSource.next(currentCount + 1);
    console.log('New notification count:', this.notificationCountSource.value);  // Debug
  }

  accessNotificationCount():number {
    return this.notificationCountSource.value;
  }

  // // Method to decrease/reset the count
  // resetNotificationCount() {
  //   this.notificationCountSource.next(0);  // Reset the count to 0
  // }

  // // Optionally, a method to set the count directly if needed
  // setNotificationCount(count: number) {
  //   this.notificationCountSource.next(count);  // Set the count to the provided value
  // }

  // // Getter for current count value
  // getNotificationCount(): number {
  //   return this.notificationCountSource.value;
  // }
}
