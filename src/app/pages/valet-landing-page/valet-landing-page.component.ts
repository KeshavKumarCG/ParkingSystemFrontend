import { Component } from '@angular/core';
import { CarTableValetComponent } from "../../components/car-table-valet/car-table-valet.component";
import { NavbarComponent } from '../../components/navbar-valet/navbar-valet.component';

@Component({
  selector: 'app-valet-landing-page',
  standalone: true,
  // imports: [NavbarValetComponent, CarSearchValetComponent, CarTableValetComponent],
  imports: [NavbarComponent, CarTableValetComponent],
  templateUrl: './valet-landing-page.component.html',
  styleUrl: './valet-landing-page.component.scss'
})
export class ValetLandingPageComponent {

}
