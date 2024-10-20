import { Component, OnInit } from '@angular/core';
import { ValetService } from '../../Services/valet.service'; // Import the valet service
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-valetinfopage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './valetinfopage.component.html',
  styleUrls: ['./valetinfopage.component.css']
})
export class ValetinfopageComponent implements OnInit {
  valetDetails: any; // This will hold the valet details

  constructor(private valetService: ValetService) {}

  ngOnInit(): void {
    const valetId = 2; // Example ID (this can be dynamic if you want)
    
    // Fetch valet details from the API
    this.valetService.getValetDetails(valetId).subscribe(
      (data) => {
        this.valetDetails = data; // Store the valet details
        console.log('Valet Details:', this.valetDetails); // For debugging
      },
      (error) => {
        console.error('Error fetching valet details:', error);
      }
    );
  }
}
