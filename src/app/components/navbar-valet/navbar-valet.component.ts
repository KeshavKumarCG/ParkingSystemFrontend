import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-valet',
  standalone: true, // Indicate that this is a standalone component
  imports: [CommonModule, RouterModule], // Import CommonModule
  templateUrl: './navbar-valet.component.html',
  styleUrls: ['./navbar-valet.component.css']
})
export class NavbarComponent implements OnInit {
  notificationCount: number = 0; // Initialize notification count

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchNotificationCount(); // Fetch notification count on component initialization
  }

  // Method to fetch notification count from the server
  fetchNotificationCount() {
    this.http.get<{ count: number }>('http://localhost:5221/valet/notifications/count') // Adjust API endpoint accordingly
      .subscribe(response => {
        this.notificationCount = response.count; // Set notification count
      }, error => {
        console.error('Error fetching notification count', error); // Handle error appropriately
      });
  }
}
