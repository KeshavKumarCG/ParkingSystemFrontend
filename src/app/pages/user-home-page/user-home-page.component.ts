import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component'; // Import the standalone component

@Component({
  selector: 'app-user-home-page',
  standalone: true, // Define this as a standalone component
  imports: [CommonModule, NavbarComponent], // Import the AppNavbarComponent
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {
  showModal: boolean = false;

  // Method to open the modal
  openModal() {
    this.showModal = true;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
  }
}
