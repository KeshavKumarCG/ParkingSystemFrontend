import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [ NavbarComponent ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

}
