import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; 
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-user-home-page',
  standalone: true, 
  imports: [CommonModule, NavbarComponent], 
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class UserHomePageComponent {
  showModal: boolean = false;

  constructor(private notificationService: NotificationService) {}

  takeYourCar() {
    this.notificationService.notifyValet(); // Notify valet
    this.showModal = true; // Show modal
  }

  closeModal() {
    this.showModal = false; // Close the modal
  }
}