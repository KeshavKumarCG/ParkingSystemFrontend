import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-navbar-valet',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-valet.component.html',
  styleUrl: './navbar-valet.component.scss'
})
export class NavbarValetComponent implements OnInit{
  notificationCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notificationCount$.subscribe((count) => {
      this.notificationCount = count;
    });
  }
}
