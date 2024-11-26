
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
    // First update the car status to unparked
    this.http.patch('http://localhost:5221/api/cars', {
      carNumber: request.carNumber,
      statusId: 'STATUS002' // Status code for unparked
    }).subscribe({
      next: () => {
        console.log(`Car status updated to unparked for car number: ${request.carNumber}`);
        // Then delete the notification
        this.deleteNotification(request);
      },
      error: (error) => {
        console.error('Error updating car status:', error);
      }
    });
  }

  private deleteNotification(request: CarRequest) {
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
