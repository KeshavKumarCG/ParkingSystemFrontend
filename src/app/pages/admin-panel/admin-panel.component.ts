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
  currentUser: any = { name: '', phoneNumber: '', email: '', role: 'User', carModel: '', carNumber: '' };
  isEditMode: boolean = false;

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
    this.isEditMode = false;
    this.currentUser = { name: '', phoneNumber: '', email: '', role: 'User', carModel: '', carNumber: '' };
    const modal = new bootstrap.Modal(document.getElementById('createUserModal'));
    modal.show();
  }

  openEditUserModal(user: any) {
    this.isEditMode = true;
    this.currentUser = { ...user };
    const modal = new bootstrap.Modal(document.getElementById('createUserModal'));
    modal.show();
  }

  saveUser() {
    if (this.isEditMode) {
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      this.currentUser.id = this.users.length + 1;
      this.users.push({ ...this.currentUser });
    }
    this.filteredUsers = [...this.users];
    bootstrap.Modal.getInstance(document.getElementById('createUserModal')).hide();
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
    this.filteredUsers = this.users;
  }
}
