import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserDetailsService } from '../../Services/user.details.service';

// Define an interface for user details
interface UserDetails {
  name: string;
  cygid: string;
  phone: string;
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
    console.log('User ID:', userId);

    if (userId) {
      try {
        this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
        console.log('User details:', this.userDetails);
      } catch (error) {
        console.error('Error retrieving user details:', error);
        // Handle error appropriately, e.g., show an alert or modal
      }
    } else {
      console.error('User ID is undefined or not found in local storage.');
      // Handle the case where the user ID is not available
      // For example, redirect to login page or show an error message
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}