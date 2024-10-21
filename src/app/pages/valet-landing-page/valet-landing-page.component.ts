import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarValetComponent } from "../../components/navbar-valet/navbar-valet.component";
import { CarTableValetComponent } from "../../components/car-table-valet/car-table-valet.component";

@Component({
  selector: 'app-valet-landing-page',
  standalone: true,
  imports: [NavbarValetComponent, CarTableValetComponent],
  templateUrl: './valet-landing-page.component.html',
  styleUrl: './valet-landing-page.component.scss'
})
export class ValetLandingPageComponent {

}
