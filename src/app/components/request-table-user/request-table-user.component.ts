import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environment/environment';

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
    this.http.get<CarRequest[]>(`${environment.apiUrl}Notifications`).subscribe({
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
      this.http.patch(`${environment.apiUrl}cars`, payload).subscribe({
        next: () => {
          console.log(`Car status updated successfully`);
          resolve(); 
        },
        error: (error) => {
          console.error('Error updating car status:', error);
          reject(`Error updating car status for car number: ${request.carNumber || request.carModel}`);
        },
      });
    });
  }

  private createPayload(request: CarRequest): any {
   
    if (request.carNumber) {
      return { carID: "", statusID: "STATUS002", carNumber: request.carNumber };
    }
    return null; 
  }

  private deleteNotification(request: CarRequest) {
    const deleteUrl = `${environment.apiUrl}Notifications/${request.notificationID}`;

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