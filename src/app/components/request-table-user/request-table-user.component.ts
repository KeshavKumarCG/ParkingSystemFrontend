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


  acceptRequest(request: CarRequest) {
    const acceptUrl = `${environment.apiUrl}Notifications/accept/${request.notificationID}`;
  
    // Perform POST request to send the email
    this.http.post(acceptUrl, {}).subscribe({
      next: () => {
      console.log(`Successfully sent email for request with ID: ${request.notificationID}`);
      this.carRequests = this.carRequests.filter((r) => r.notificationID !== request.notificationID);
      const acceptButton = document.querySelector(`.accept-button`);
        const doneButton = document.querySelector(`.done-button`);

        if (acceptButton && doneButton) {
          acceptButton.classList.add('d-none');
          doneButton.classList.remove('d-none');
        }

      },
      error: (error) => {
      // console.error(`Error sending email for request with ID: ${request.notificationID}`, error);
      },
    }
  );
  
    console.log('Car request updated and updated car status is In-Transit:', request);
  
    // Only send carNumber (carID will be empty)
    this.updateCarStatusAccepted(request)
    
      .then(() => {
        console.log('Successfully updated car status for car number:', request.carNumber);
        const acceptButton = document.querySelector(`.accept-button`);
        const doneButton = document.querySelector(`.done-button`);

        if (acceptButton && doneButton) {
          acceptButton.classList.add('d-none');
          doneButton.classList.remove('d-none');
        }

      })
      .catch((error) => {
        console.error('Error updating car status:', error);
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

  private updateCarStatusAccepted(request: CarRequest): Promise<void> {
    // Prepare the payload with only carNumber or an empty carID
    const payload = this.createPayloadAccepted(request);

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
   
    if (request.carNumber) {
      return { carID: "", statusID: "STATUS002", carNumber: request.carNumber };
    }
    return null; 
  }

  private createPayloadAccepted(request: CarRequest): any {
    // Only send carNumber in the payload, carID will be empty
    if (request.carNumber) {
      return { carID: "", statusID: "STATUS003", carNumber: request.carNumber };
    }
    return null; // Reject if carNumber is not available
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

