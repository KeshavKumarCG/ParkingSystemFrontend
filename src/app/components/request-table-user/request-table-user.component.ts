import { Component } from '@angular/core';
import { CarTableValetComponent } from "../../components/car-table-valet/car-table-valet.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NavbarValetComponent } from "../../components/navbar-valet/navbar-valet.component";

@Component({
  selector: 'app-request-table-user',
  standalone: true,
  imports: [CarTableValetComponent, NavbarValetComponent],
  templateUrl: './request-table-user.component.html',
  styleUrl: './request-table-user.component.scss'
})
export class NotificationsComponent {
toggleRequests() {
throw new Error('Method not implemented.');
}
searchTerm: any;
markAsReady(arg0: any) {
throw new Error('Method not implemented.');
}

}

