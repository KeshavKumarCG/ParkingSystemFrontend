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
  styleUrls: ['./request-table-user.component.scss']
})
export class RequestTableUserComponent implements OnInit {
  carRequests: CarRequest[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCarRequests();
  }

  fetchCarRequests() {
    this.http.get<CarRequest[]>('http://localhost:5221/api/Notifications')
      .subscribe({
        next: (data) => {
          this.carRequests = data;
        },
        error: (error) => {
          console.error('Error fetching car requests:', error);
        }
      });
  }

  deleteRequest(request: CarRequest) {
    console.log('deleteRequest called for car number:', request.carNumber);
    console.log('Attempting to update car status for:', request.carNumber);
    
    // Make sure we're sending the correct payload
    const updatePayload = {
      carNumber: request.carNumber,  
      statusId: 'STATUS002'  // Status code for unparked
    };

    // Update the car status to 'unparked' using the new API
    this.http.patch('http://localhost:5221/api/Cars/update-by-car-number', updatePayload)
      .subscribe({
        next: (response) => {
          console.log('Car status update response:', response);
          console.log(`Car status updated to unparked for car number: ${request.carNumber}`);
          
          // Proceed to delete the notification after the status update
          this.deleteNotification(request);
        },
        error: (error) => {
          console.error('Error in patch request (status update):', error);
        }
      });

    console.log('deleteRequest is exiting (if you see this log, the request has not completed yet)');
  }

  private deleteNotification(request: CarRequest) {
    console.log('deleteNotification called for notification ID:', request.notificationID);
    const deleteUrl = `http://localhost:5221/api/Notifications/${request.notificationID}`;

    this.http.delete(deleteUrl).subscribe({
      next: () => {
        console.log(`Successfully deleted request with ID: ${request.notificationID}`);
        this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
      },
      error: (error) => {
        console.error(`Error deleting request with ID: ${request.notificationID}`, error);
      }
    });
  }
}