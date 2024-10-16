
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface CarRequest {


//   id: string;
//   carName: string;
//   licensePlate: string;
//   userPhone: string;
//   requestTime: Date;
//   status: 'Pending' | 'Ready';
// }

// @Component({
//   selector: 'app-request-table-user',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './request-table-user.component.html',
//   styleUrls: ['./request-table-user.component.scss']
// })
// export class RequestTableUserComponent implements OnInit {
// toggleRequestStatus(_t14: CarRequest) {
// throw new Error('Method not implemented.');
// }
// acceptRequest(_t14: CarRequest) {
// throw new Error('Method not implemented.');
// }
//   carRequests: CarRequest[] = [];
//   columns: {field: keyof CarRequest, header: string}[] = [
//     {field: 'carName', header: 'Car'},
//     {field: 'licensePlate', header: 'License Plate'},
//     {field: 'userPhone', header: 'User Phone'},
//     {field: 'requestTime', header: 'Request Time'},
//     {field: 'status', header: 'Status'}
//   ];

//   ngOnInit() {
//     this.loadMockData();
//   }

//   loadMockData() {
//     this.carRequests = [
//       { id: '1', carName: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', requestTime: new Date(), status: 'Pending' },
//       { id: '2', carName: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', requestTime: new Date(Date.now() - 3600000), status: 'Ready' },
//       { id: '3', carName: 'Ford Mustang', licensePlate: 'DEF456', userPhone: '555-123-4567', requestTime: new Date(Date.now() - 7200000), status: 'Pending' },
//     ];
//   }

//   markAsReady(requestId: string) {
//     const request = this.carRequests.find(r => r.id === requestId);
//     if (request) {
//       request.status = 'Ready';
//       console.log(`Car request ${requestId} marked as ready`);
//     }
//   }

//   cancelRequest(requestId: string) {
//     this.carRequests = this.carRequests.filter(r => r.id !== requestId);
//     console.log(`Cancelling request with ID: ${requestId}`);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarRequest {
  id: string;
  carName: string;
  licensePlate: string;
  userPhone: string;
  requestTime: Date;
  status: 'Pending' | 'Ready';
  accepted?: boolean;
}

@Component({
  selector: 'app-request-table-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.scss']
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [];
  columns: {field: keyof CarRequest, header: string}[] = [
    {field: 'carName', header: 'Car'},
    {field: 'licensePlate', header: 'License Plate'},
    {field: 'userPhone', header: 'User Phone'},
    {field: 'requestTime', header: 'Request Time'},
    {field: 'status', header: 'Status'}
  ];

  ngOnInit() {
    this.loadMockData();
  }

  loadMockData() {
    this.carRequests = [
      { id: '1', carName: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', requestTime: new Date(), status: 'Pending' },
      { id: '2', carName: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', requestTime: new Date(Date.now() - 3600000), status: 'Ready' },
      { id: '3', carName: 'Ford Mustang', licensePlate: 'DEF456', userPhone: '555-123-4567', requestTime: new Date(Date.now() - 7200000), status: 'Pending' },
    ];
  }

  toggleRequestStatus(request: CarRequest) {
    if (!request.accepted) {
      request.accepted = true;
      request.status = 'Ready';
    } else {
      this.cancelRequest(request.id);
    }
  }

  acceptRequest(request: CarRequest) {
    request.accepted = true;
    request.status = 'Ready';
    console.log(`Accepted request for ${request.carName}`);
  }

  markAsReady(requestId: string) {
    const request = this.carRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'Ready';
      console.log(`Car request ${requestId} marked as ready`);
    }
  }

  cancelRequest(requestId: string) {
    this.carRequests = this.carRequests.filter(r => r.id !== requestId);
    console.log(`Cancelling request with ID: ${requestId}`);
  }
}
