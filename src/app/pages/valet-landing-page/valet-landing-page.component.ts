import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from "../../components/navbar-valet/navbar-valet.component";
import { CarTableValetComponent } from "../../components/car-table-valet/car-table-valet.component";
import { NavbarComponent as NavbarComponent1 } from "../../components/navbar-valet/navbar-valet.component";
// import { NavbarComponent } from '../../components/navbar-valet/navbar-valet.component';


@Component({
  selector: 'app-valet-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CarTableValetComponent],
  templateUrl: './valet-landing-page.component.html',
  styleUrls: ['./valet-landing-page.component.scss']
})
export class ValetLandingPageComponent {

}
