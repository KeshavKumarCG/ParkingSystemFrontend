


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

// interface CarRequest {
//   id: string;
//   carName: string;
//   licensePlate: string;
//   userPhone: string;
//   requestTime: Date;
//   // status: 'Pending' | 'Ready';
// }

// @Component({
//   selector: 'app-request-table-user',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './request-table-user.component.html',
//   styleUrls: ['./request-table-user.component.scss']
// })
// export class RequestTableUserComponent implements OnInit {
//   carRequests: CarRequest[] = [];

//   ngOnInit() {
//     // Mock data - replace with actual data fetching logic
//     this.carRequests = [
//       { id: '1', carName: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', requestTime: new Date() },
//       { id: '2', carName: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', requestTime: new Date() },
//     ];
//   }

//   cancelRequest(requestId: string) {
//     // Implement cancel request logic here
//     console.log(`Cancelling request with ID: ${requestId}`);
//     this.carRequests = this.carRequests.filter(request => request.id !== requestId);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface CarRequest {
  id: string;
  carName: string;
  licensePlate: string;
  userPhone: string;
  requestTime: Date;
}

@Component({
  selector: 'app-request-table-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.scss']
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [];

  ngOnInit() {
    this.loadCarRequests();
  }

  loadCarRequests() {
    this.carRequests = [
      { id: '1', carName: 'Toyota Camry', licensePlate: 'ABC123', userPhone: '123-456-7890', requestTime: new Date() },
      { id: '2', carName: 'Honda Civic', licensePlate: 'XYZ789', userPhone: '987-654-3210', requestTime: new Date() },
    ];
  }

  completeRequest(requestId: string) {
    console.log(`Completing request with ID: ${requestId}`);
    this.carRequests = this.carRequests.filter(request => request.id !== requestId);
  }
}
