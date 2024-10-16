import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarValetComponent } from "../../components/navbar-valet/navbar-valet.component";
import { CarTableValetComponent } from "../../components/car-table-valet/car-table-valet.component";

@Component({
  selector: 'app-valet-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarValetComponent, CarTableValetComponent],
  templateUrl: './valet-landing-page.component.html',
  styleUrls: ['./valet-landing-page.component.scss']
})
export class ValetLandingPageComponent {
  // Component logic can be added here
}
