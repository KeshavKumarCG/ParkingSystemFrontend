import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserDetailsService } from '../../Services/user.details.service';
import { CarDetailsService } from '../../Services/cardetails.service';

interface UserDetails {
  id: number;
  cygid: string;
  name: string;
  phoneNumber: string;
  email: string;
}

interface CarDetails {
  carNumber: string;
  carModel: string;
}

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
  providers: [UserDetailsService, CarDetailsService]
})
export class UserHomePageComponent implements OnInit {
  showModal = false;
  userDetails: UserDetails | null = null;
  carDetails: CarDetails | null = null;

  constructor(
    private userDetailsService: UserDetailsService,
    private carDetailsService: CarDetailsService
  ) {}

  async ngOnInit() {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');

    if (userId) {
      try {
        this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
        if (this.userDetails) {
          localStorage.setItem('name', this.userDetails.name);
          this.fetchCarDetails(userId);
        }
        console.log('User details:', this.userDetails);
      } catch (error) {
        console.error('Error retrieving user details:', error);
      }
    } else {
      console.error('User ID is undefined or not found in local storage.');
    }

    console.log('User ID , name from localStorage:', name);
  }

  async fetchCarDetails(userId: string) {
    try {
      const data: CarDetails[] = await this.carDetailsService.getCarDetailsByUserId(userId);
      if (data.length > 0) {
        this.carDetails = data[0];
        console.log('Car details:', this.carDetails);
      } else {
        console.warn('No car details found for user:', userId);
      }
    } catch (error) {
      console.error('Error retrieving car details:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleClick() {
    this.openModal();
    this.takeCar();
  }

  async takeCar() {
    if (this.userDetails && this.carDetails) {
      const notificationData = {
        userName: this.userDetails.name,
        phoneNumber: this.userDetails.phoneNumber,
        carNumber: this.carDetails.carNumber,
        carModel: this.carDetails.carModel,
        email: this.userDetails.email,
      };

      try {
       
        const response = await fetch('http://localhost:5221/api/valet/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notificationData),
        });

        const result = await response.json();

        // Handle successful response
        if (response.ok) {
          console.log('Notification created:', result);
          this.openModal(); // Open the modal if successful
        } else if (response.status === 409) {
          console.warn('Conflict: Notification for this car and phone number already exists.');
        } else if (response.status === 400) {
          console.error('Bad Request: Invalid notification data.');
        } else {
          console.error('Unexpected error:', result);
        }
      } catch (error) {
        console.error('Error in notification process:', error);
      }
    }
  }
}
