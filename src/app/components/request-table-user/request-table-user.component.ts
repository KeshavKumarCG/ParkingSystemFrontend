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
  styleUrls: ['./request-table-user.component.scss']
})
export class RequestTableUserComponent implements OnInit, OnDestroy {
  carRequests: CarRequest[] = [];
  private refreshInterval: any;
  isLoading: boolean = true;

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
      }, 5000);
    });
  }

  private stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async fetchCarRequests() {
    this.isLoading = true; 
    try {
      const response = await fetch('http://localhost:5221/api/valet/notifications');
      if (!response.ok) {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      this.ngZone.run(() => {
        this.carRequests = Array.isArray(data) ? data : [];
      });
    } catch (error) {
      console.error('Error fetching car requests:', error);
    } finally {
      this.isLoading = false; 
    }
  }

  async deleteRequest(request: CarRequest) {
    const deleteUrl = `http://localhost:5221/api/valet/notifications/${request.notificationID}`;

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
        throw new Error(`Failed to delete request: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting request with ID: ${request.notificationID}`, error);
    }
  }
}
