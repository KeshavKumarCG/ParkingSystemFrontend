import { Component, OnInit } from '@angular/core';
import { ValetService } from '../../Services/valet.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-valetinfopage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './valetinfopage.component.html',
  styleUrls: ['./valetinfopage.component.css']
})
export class ValetinfopageComponent implements OnInit {
  valetDetails: any;

  constructor(private valetService: ValetService) {}

  ngOnInit(): void {
    const valetId = 2; 
    
    
    this.valetService.getValetDetails(valetId).subscribe(
      (data) => {
        this.valetDetails = data; 
        console.log('Valet Details:', this.valetDetails);
      },
      (error) => {
        console.error('Error fetching valet details:', error);
      }
    );
  }
}
