import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-valet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-valet.component.html',
  styleUrls: ['./navbar-valet.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  notificationCount: number = 0;
  intervalId: any;

  router: any;

  constructor() {}

  ngOnInit() {
    this.fetchNotificationCount();
    this.intervalId = setInterval(() => {
      this.fetchNotificationCount();
    }, 10000); 
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  logout() {
    console.log('User logged out');
    localStorage.clear();
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
