import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserDetailsService } from '../../Services/user.details.service';

// Define the UserDetails interface
interface UserDetails {
  id: number;
  cygid: string;
  name: string;
  phoneNumber: string; // Ensure this matches the API response
  email: string;
}

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
  providers: [UserDetailsService]
})
export class UserHomePageComponent implements OnInit {
  showModal = false;
  userDetails: UserDetails | null = null;

  constructor(private userDetailsService: UserDetailsService) {}

  async ngOnInit() {
    const userId = localStorage.getItem('Id');
    const name = localStorage.getItem('name');
    if (userId) {
      try {
      this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
      if (this.userDetails) {
        localStorage.setItem('name', this.userDetails.name);
      }
      console.log('User details:', this.userDetails);
      } catch (error) {
      console.error('Error retrieving user details:', error);
      }
    } else {
      console.error('User ID is undefined or not found in local storage.');
    }

    console.log('User ID , name from localStorage:', name);

    if (userId) {
      try {
        this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
        console.log('User details:', this.userDetails);
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    } else {
      console.error('User ID is undefined or not found in local storage.');
    }
  }

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
        },
        error => {
          console.error('Error sending notification:', error);
        }
      );

      console.log('Button clicked!');
    }}