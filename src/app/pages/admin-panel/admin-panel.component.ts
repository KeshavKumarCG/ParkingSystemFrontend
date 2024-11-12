import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from '../../components/navbar-admin/navbar-admin.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent, NavbarComponent, FormsModule], // Add FormsModule here
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  searchQuery: string = '';
  users: any[] = [
    { id: 1, name: 'Aarav Sharma', phoneNumber: '987-654-3210', email: 'aarav.sharma@example.com', role: 'Admin', carModel: 'Toyota Fortuner', carNumber: 'DL 3C 1234' },
    { id: 2, name: 'Ishita Patel', phoneNumber: '912-345-6789', email: 'ishita.patel@example.com', role: 'User', carModel: 'Honda Civic', carNumber: 'MH 12 AB 5678' },
    { id: 3, name: 'Rohit Gupta', phoneNumber: '996-533-4455', email: 'rohit.gupta@example.com', role: 'User', carModel: 'Maruti Suzuki Swift', carNumber: 'KA 05 CD 2345' },
    { id: 4, name: 'Priya Verma', phoneNumber: '777-123-4567', email: 'priya.verma@example.com', role: 'Admin', carModel: 'BMW X5', carNumber: 'UP 32 ZV 6789' },
    { id: 5, name: 'Vikram Singh', phoneNumber: '888-444-1234', email: 'vikram.singh@example.com', role: 'User', carModel: 'Hyundai Creta', carNumber: 'TN 10 JH 2345' },
    { id: 6, name: 'Neha Desai', phoneNumber: '989-765-4321', email: 'neha.desai@example.com', role: 'User', carModel: 'Ford EcoSport', carNumber: 'MH 15 AK 8901' },
  ];
  filteredUsers: any[] = [];

  ngOnInit(): void {
    this.filteredUsers = this.users; // Initialize filtered users
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.carNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(this.searchQuery) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.carModel.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  


  openCreateUserModal() {
    // Logic to open modal to create a new user
  }

  editUser(user: any) {
    // Logic to edit an existing user
  }

  deleteUser(user: any) {
    // Logic to delete a user
  }
}

