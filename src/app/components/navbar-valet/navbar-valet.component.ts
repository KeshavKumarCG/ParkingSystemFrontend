import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDetailsService } from '../../Services/user.details.service';

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
  userName: string = ''; 

  constructor(private router: Router, private userDetailsService: UserDetailsService) {}

  ngOnInit() {
    this.fetchUserName(); 
    this.fetchNotificationCount();
    this.intervalId = setInterval(() => {
      this.fetchNotificationCount(); 
    }, 10); 
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

  async fetchUserName() {
    const id = localStorage.getItem('Id');
    try {
      const userDetails = await this.userDetailsService.getUserDetailsById(id);
      this.userName = userDetails.name; 
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']); 
  }

  async fetchNotificationCount() {
    try {
      const response = await fetch('http://localhost:5221/valet/notifications/count');
      const data = await response.json();
      this.notificationCount = data.count > 0 ? data.count : 0;
    } catch (error) {
      console.error('Error fetching notification count', error);
    }
  }
  
}



