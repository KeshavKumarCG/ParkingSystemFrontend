import { Component, OnInit } from '@angular/core';

interface CarRequest {
  id: string;
  carName: string;
  licensePlate: string;
  userPhone: string;
  requestTime: Date;
}

@Component({
  selector: 'app-request-table-user',
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.scss']
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [
    { id: '1', carName: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '9907580726', requestTime: new Date('2023-05-20T10:30:00') },
    { id: '2', carName: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '9417230210', requestTime: new Date('2023-05-20T11:15:00') },
    { id: '3', carName: 'Ford Mustang', licensePlate: 'DEF456', userPhone: '9876543210', requestTime: new Date('2023-05-20T12:00:00') }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  markAsReady(event: Event, requestId: string) {
    const button = event.target as HTMLButtonElement;
    button.classList.add('clicked');
    button.textContent = 'Marked as Ready';
    console.log(`Car request ${requestId} marked as ready`);
  }
}
