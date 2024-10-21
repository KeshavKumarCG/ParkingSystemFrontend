import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NotificationService } from '../../Services/notification.service'; // Import the NotificationService
 
@Component({
  selector: 'app-user-home-page',
  standalone: true, // Indicate that this is a standalone component
  imports: [CommonModule, HttpClientModule, NavbarComponent], // Add HttpClientModule to imports
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {
  showModal: boolean = false;
 
  constructor(private http: HttpClient, private notificationService: NotificationService) {}
 
  openModal() {
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
  }
 
  handleClick() {
    this.openModal(); // Open modal
    this.takeCar();   // Send notification data
  }
 
  takeCar() {
    const notificationData = {
        userName: 'Harshdeep Singh',
        phoneNumber: '+91 94444 55663',
        carNumber: 'PB65K2272',
        carModel: 'Toyota Camry',
    };
 
    this.http.post('http://localhost:5221/valet/notifications', notificationData)
      .subscribe(
        response => {
          console.log('Notification sent successfully:', response);
          this.closeModal();
        },
        error => {
          console.error('Error sending notification:', error);
          // Optionally log the response to see what is returned
          console.error('Error response:', error.error);
        }
      );

      console.log('Button clicked!');
    // This will trigger an increase in the notification count
    this.notificationService.increaseNotificationCount();
}
}