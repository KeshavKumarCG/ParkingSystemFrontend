
import { Component } from '@angular/core';
import { NavbarComponent as NavbarValetComponent } from '../../components/navbar-valet/navbar-valet.component';
import { RequestTableUserComponent } from "../../components/request-table-user/request-table-user.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [RequestTableUserComponent, NavbarValetComponent]
})
export class NotificationsComponent {}
