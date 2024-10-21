import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../Services/notification.service';  // Adjust the path accordingly
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-valet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-valet.component.html',
  styleUrls: ['./navbar-valet.component.css']
})
export class NavbarValetComponent implements OnInit {
  notificationCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to the notification count observable to update the bell icon badge
    this.notificationService.notificationCount$.subscribe(count => {
      // console.log('Notification count updated:', count);
      next : () => this.notificationCount = count;
    });
  }
}
