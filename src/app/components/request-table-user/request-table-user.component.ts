// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule, DatePipe } from '@angular/common';

// interface CarRequest {
//   id: number;
//   carName: string;
//   licensePlate: string;
//   userPhone: string;
//   requestTime: string;
// }

// @Component({
//   selector: 'app-request-table-user',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, DatePipe],
//   templateUrl: './request-table-user.component.html',
//   styleUrls: ['./request-table-user.component.css']
// })
// export class RequestTableUserComponent implements OnInit {
//   carRequests: CarRequest[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchCarRequests();
//   }

//   fetchCarRequests() {
//     this.http.get<CarRequest[]>('http://localhost:5221/api/Notifications')
//       .subscribe(
//         (data) => {
//           this.carRequests = data;
//         },
//         (error) => {
//           console.error('Error fetching car requests:', error);
//         }
//       );
//   }

//   // cancelRequest(id: number) {
//   //   console.log('Cancelling request with id:', id);
//   //   // Implement the cancellation logic here
//   // }

//   cancelRequest(id: number) {
//     console.log('Cancelling request with id:', id);
//     const deleteUrl = `http://localhost:5221/api/Notifications/${id}`;

//     this.http.delete(deleteUrl).subscribe(
//       () => {
//         console.log(`Successfully deleted request with ID: ${id}`);
//         // Remove the deleted item from the local array
//         this.carRequests = this.carRequests.filter(request => request.id !== id);
//       },
//       (error) => {
//         console.error(`Error deleting request with ID: ${id}`, error);
//       }
//     );
//   }

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

interface CarRequest {
  notificationID: number;
  userName: string;
  phoneNumber: string;
  carNumber: string;
  carModel: string;
  notificationTime: string;

}

@Component({
  selector: 'app-request-table-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DatePipe],
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.css']
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCarRequests();
  }

  fetchCarRequests() {
    this.http.get<CarRequest[]>('http://localhost:5221/api/Notifications')
      .subscribe(
        (data) => {
          this.carRequests = data;
        },
        (error) => {
          console.error('Error fetching car requests:', error);
        }
      );
  }


 public deleteRequest(request: CarRequest) {
    const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

    this.http.delete(deleteUrl).subscribe(
      () => {
        console.log(`Successfully deleted request with ID: ${request.notificationID}`);
        this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
      },
      (error) => {
        console.error(`Error deleting request with ID: ${request.notificationID}`, error);
      }
    );
  }

}
