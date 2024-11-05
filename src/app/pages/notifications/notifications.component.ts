import { Component } from '@angular/core';
import { NavbarComponent as NavbarComponent1} from '../../components/navbar-valet/navbar-valet.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RequestTableUserComponent } from "../../components/request-table-user/request-table-user.component.spec";

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  imports: [NavbarComponent, RequestTableUserComponent , NavbarComponent1]
})
export class NotificationsComponent {

}
