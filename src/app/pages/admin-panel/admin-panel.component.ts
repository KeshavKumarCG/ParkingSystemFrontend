import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdminComponent } from '../../components/navbar-admin/navbar-admin.component';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, NavbarAdminComponent, FormsModule],
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
  newUser: any = { name: '', phoneNumber: '', email: '', role: 'User', carModel: '', carNumber: '' };
  selectedUser: any = null; // Track the user currently being edited

  ngOnInit(): void {
    this.filteredUsers = this.users;
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
    this.newUser = { name: '', phoneNumber: '', email: '', role: 'User', carModel: '', carNumber: '' };
    this.selectedUser = null; // Reset selectedUser
    const createUserModal = new bootstrap.Modal(document.getElementById('createUserModal'));
    createUserModal.show();
  }

  openEditUserModal(user: any) {
    this.selectedUser = { ...user }; // Copy user data to avoid direct binding
    const editUserModal = new bootstrap.Modal(document.getElementById('createUserModal'));
    editUserModal.show();
  }

  addUser() {
    if (this.selectedUser) {
      // Edit existing user
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser }; // Update user data
      }
      this.selectedUser = null; // Reset selectedUser after editing
    } else {
      // Add new user
      this.users.push({ ...this.newUser, id: this.users.length + 1 });
    }
    this.filteredUsers = this.users; // Refresh filtered users list
    this.newUser = { name: '', phoneNumber: '', email: '', role: 'User', carModel: '', carNumber: '' }; // Reset newUser form
    bootstrap.Modal.getInstance(document.getElementById('createUserModal')).hide();
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
    this.filteredUsers = this.users;
  }
}
