import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-valet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-valet.component.html',
  styleUrls: ['./navbar-valet.component.css']
})
export class NavbarComponent implements OnInit {
  notificationCount: number = 0;

  router: any;

  constructor() {}

  ngOnInit() {
    this.fetchNotificationCount();
  }

  logout() {
    // Perform logout logic here, e.g., clearing tokens, etc.
    console.log('User logged out');
    // Clear local storage
    localStorage.clear();
    // Redirect to login or home page
  }

  async fetchNotificationCount() {
    try {
      const response = await fetch('http://localhost:5221/valet/notifications/count');
      const data = await response.json();
      this.notificationCount = data.count;
    } catch (error) {
      console.error('Error fetching notification count', error);
    }
  }

}
