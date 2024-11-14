import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface CarRequest {
  notificationID: number;
  userName: string;
  phoneNumber: string;
  carNumber: string;
  carModel: string;
  notificationTime: string;
  email: string;
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
  userName: string = '';
  notificationCount: number = 0;
  private notificationIntervalId: any;

  constructor() {}

  ngOnInit() {
    // Fetch data immediately on component initialization
    this.fetchCarRequests();
    // this.fetchUserName();

    // Set up a short interval to keep fetching notification count
    this.notificationIntervalId = setInterval(() => {
      // this.fetchUserName();
      this.fetchCarRequests();
    }, 2000); // Adjust as necessary for performance
  }

  ngOnDestroy() {
    // Clear interval on component destruction to avoid memory leaks
    if (this.notificationIntervalId) {
      clearInterval(this.notificationIntervalId);
    }
  }

  async fetchCarRequests() {
    try {
      const response = await fetch('http://localhost:5221/api/Notifications');
      const data = await response.json();
      this.carRequests = [...data];
    } catch (error) {
      console.error('Error fetching car requests:', error);
    }
  }

  // async fetchUserName() {
  //   const id = localStorage.getItem('Id');
  //   if (!id) return;

  //   try {
  //     const response = await fetch(`http://localhost:5221/api/Users/${id}`);
  //     const data = await response.json();
  //     this.userName = data.name;
  //   } catch (error) {
  //     console.error('Error fetching user name:', error);
  //   }
  // }

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
        this.carRequests = this.carRequests.filter(r => r.notificationID !== request.notificationID);
      } else {
        throw new Error(`Failed to delete request: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting request with ID: ${request.notificationID}`, error);
    }
  }
}
