import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private router: Router) {}

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

  goToHome() {
    const id = localStorage.getItem('Id');
    if (id) {
      this.router.navigate([`/valet/home/${id}`]);
    } else {
      console.error('No user ID found in local storage.');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    console.log('User logged out');
    localStorage.clear();
    this.router.navigate(['/login']); // Redirect to login after logout
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
