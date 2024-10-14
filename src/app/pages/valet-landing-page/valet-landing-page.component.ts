import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarValetComponent } from "../../components/navbar-valet/navbar-valet.component";

@Component({
  selector: 'app-valet-landing-page',
  standalone: true,
  imports: [NavbarValetComponent],
  templateUrl: './valet-landing-page.component.html',
  styleUrl: './valet-landing-page.component.scss'
})
export class ValetLandingPageComponent {

}
