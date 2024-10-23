

// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule, DatePipe } from '@angular/common';

// interface CarRequest {
//   notificationID: number;
//   userName: string;
//   phoneNumber: string;
//   carNumber: string;
//   carModel: string;
//   notificationTime: string;

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


//  public deleteRequest(request: CarRequest) {
//     const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

//     this.http.delete(deleteUrl).subscribe(
//       () => {
//         console.log(`Successfully deleted request with ID: ${request.notificationID}`);
//         this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
//       },
//       (error) => {
//         console.error(`Error deleting request with ID: ${request.notificationID}`, error);
//       }
//     );
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';

// interface CarRequest {
//   notificationID: number;
//   userName: string;
//   phoneNumber: string;
//   carNumber: string;
//   carModel: string;
//   notificationTime: string;
// }

// @Component({
//   selector: 'app-request-table-user',
//   standalone: true,
//   imports: [CommonModule, DatePipe],
//   templateUrl: './request-table-user.component.html',
//   styleUrls: ['./request-table-user.component.css']
// })
// export class RequestTableUserComponent implements OnInit {
//   carRequests: CarRequest[] = [];

//   constructor() {}

//   ngOnInit() {
//     this.fetchCarRequests();
//   }

//   async fetchCarRequests() {
//     try {
//       const response = await fetch('http://localhost:5221/api/Notifications');
//       const data = await response.json();
//       this.carRequests = data;
//     } catch (error) {
//       console.error('Error fetching car requests:', error);
//     }
//   }

//   async deleteRequest(request: CarRequest) {
//     const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

//     try {
//       const response = await fetch(deleteUrl, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         console.log(`Successfully deleted request with ID: ${request.notificationID}`);
//         this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
//       } else {
//         throw new Error(`Failed to delete request: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error(`Error deleting request with ID: ${request.notificationID}`, error);
//     }
//   }
// }
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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
  imports: [CommonModule, DatePipe],
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.css']
})
export class RequestTableUserComponent implements OnInit, OnDestroy {
  carRequests: CarRequest[] = [];
  private refreshInterval: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.fetchCarRequests();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  private startAutoRefresh() {
    this.ngZone.runOutsideAngular(() => {
      this.refreshInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.fetchCarRequests();
        });
      }, 3000);
    });
  }

  private stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async fetchCarRequests() {
    try {
      const response = await fetch('http://localhost:5221/api/Notifications');
      const data = await response.json();
      this.ngZone.run(() => {
        this.carRequests = [...data];
      });
    } catch (error) {
      console.error('Error fetching car requests:', error);
    }
  }

  async deleteRequest(request: CarRequest) {
    const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

    try {
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        this.ngZone.run(() => {
          this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
        });
      } else {
        throw new Error(`Failed to delete request: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting request with ID: ${request.notificationID}`, error);
    }
  }
}
