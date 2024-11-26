
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

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
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './request-table-user.component.html',
//   styleUrls: ['./request-table-user.component.scss'],
// })
// export class RequestTableUserComponent implements OnInit {
//   carRequests: CarRequest[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchCarRequests();
//   }

//   fetchCarRequests() {
//     this.http.get<CarRequest[]>('http://localhost:5221/api/Notifications').subscribe({
//       next: (data) => {
//         this.carRequests = data;
//       },
//       error: (error) => {
//         console.error('Error fetching car requests:', error);
//       },
//     });
//   }

//   deleteRequest(request: CarRequest) {
//     // First update the car status to unparked
//     console.log('Updating car status to unparked for car number:', request.carNumber);
//     this.http.patch('http://localhost:5221/api/cars', {
//       carNumber: request.carNumber,
//       statusId: 'STATUS002', // Status code for unparked
//     }).subscribe({
//       next: () => {
//         console.log(`Car status updated to unparked for car number: ${request.carNumber}`);
//         // Then delete the notification
//         this.deleteNotification(request);
//       },
//       error: (error) => {
//         console.error('Error updating car status on u:', error);
//       },
//     });
//   }

//   private deleteNotification(request: CarRequest) {
//     const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;
//     this.http.delete(deleteUrl).subscribe({
//       next: () => {
//         console.log(`Successfully deleted request with ID: ${request.notificationID}`);
//         this.carRequests = this.carRequests.filter((r) => r.notificationID !== request.notificationID);
//       },
//       error: (error) => {
//         console.error(`Error deleting request with ID: ${request.notificationID}`, error);
//       },
//     });
//   }
// }









import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, HttpClientModule],
  templateUrl: './request-table-user.component.html',
  styleUrls: ['./request-table-user.component.scss'],
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCarRequests();
  }

  fetchCarRequests() {
    this.http.get<CarRequest[]>('http://localhost:5221/api/Notifications').subscribe({
      next: (data) => {
        this.carRequests = data;
      },
      error: (error) => {
        console.error('Error fetching car requests:', error);
      },
    });
  }

  deleteRequest(request: CarRequest) {
    console.log('Preparing to update car status for request:', request);

    // Only send carNumber (carID will be empty)
    this.updateCarStatus(request)
      .then(() => {
        console.log('Successfully updated car status for car number:', request.carNumber);

        // If status update succeeds, delete the notification
        this.deleteNotification(request);
      })
      .catch((error) => {
        console.error('Error updating car status:', error);
      });
  }

  private updateCarStatus(request: CarRequest): Promise<void> {
    // Prepare the payload with only carNumber or an empty carID
    const payload = this.createPayload(request);

    if (!payload) {
      console.error('No valid identifier found for car status update');
      return Promise.reject('No valid identifier found for car status update');
    }

    console.log('Sending payload to update car status:', payload);

    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:5221/api/cars', payload).subscribe({
        next: () => {
          console.log(`Car status updated successfully`);
          resolve(); // Resolve on success
        },
        error: (error) => {
          console.error('Error updating car status:', error);
          reject(`Error updating car status for car number: ${request.carNumber || request.carModel}`);
        },
      });
    });
  }

  private createPayload(request: CarRequest): any {
    // Only send carNumber in the payload, carID will be empty
    if (request.carNumber) {
      return { carID: "", statusID: "STATUS002", carNumber: request.carNumber };
    }
    return null; // Reject if carNumber is not available
  }

  private deleteNotification(request: CarRequest) {
    const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

    // Perform DELETE request to remove the notification
    this.http.delete(deleteUrl).subscribe({
      next: () => {
        console.log(`Successfully deleted request with ID: ${request.notificationID}`);
        this.carRequests = this.carRequests.filter((r) => r.notificationID !== request.notificationID);
      },
      error: (error) => {
        console.error(`Error deleting request with ID: ${request.notificationID}`, error);
      },
    });
  }
}
