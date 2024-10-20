import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; 
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {
  showModal: boolean = false;

  constructor(private notificationService: NotificationService) {}

  // Method to open the modal and increment notification count
  takeYourCar() {
    this.notificationService.incrementCount(); // Increment the notification count
    this.showModal = true; // Open the modal
    console.log('Car taken');
    // Removed the reset notification count logic
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false; // Close the modal
  }
}
