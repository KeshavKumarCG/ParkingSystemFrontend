import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationCountSubject = new BehaviorSubject<number>(0);
  notificationCount$ = this.notificationCountSubject.asObservable();

  updateNotificationCount(count: number) {
    this.notificationCountSubject.next(count);
  }

  notifyValet() {
    this.updateNotificationCount(this.notificationCountSubject.value + 1);
    console.log("Notifying valet");
  }
}
