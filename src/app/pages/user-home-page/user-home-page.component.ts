// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { NavbarComponent } from '../../components/navbar/navbar.component';
// import { UserDetailsService } from '../../Services/user.details.service';
// import { CarDetailsService } from '../../Services/cardetails.service';

// interface UserDetails {
//   id: number;
//   cygid: string;
//   name: string;
//   phoneNumber: string;
//   email: string;
// }

// interface CarDetails {
//   carNumber: string;
//   carModel: string;
//   status: string; // New field for car status
// }


// @Component({
//   selector: 'app-user-home-page',
//   standalone: true,
//   imports: [CommonModule, RouterModule, NavbarComponent],
//   templateUrl: './user-home-page.component.html',
//   styleUrls: ['./user-home-page.component.css'],
//   providers: [UserDetailsService, CarDetailsService]
// })
// export class UserHomePageComponent implements OnInit {
//   showModal = false;
//   userDetails: UserDetails | null = null;
//   carDetails: CarDetails | null = null;

//   constructor(
//     private userDetailsService: UserDetailsService,
//     private carDetailsService: CarDetailsService
//   ) {}

//   async ngOnInit() {
//     const userId = localStorage.getItem('Id');
//     const name = localStorage.getItem('name');

//     if (userId) {
//       try {
//         this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
//         if (this.userDetails) {
//           localStorage.setItem('name', this.userDetails.name);
//           this.fetchCarDetails(userId);
//         }
//         console.log('User details:', this.userDetails);
//       } catch (error) {
//         console.error('Error retrieving user details:', error);
//       }
//     } else {
//       console.error('User ID is undefined or not found in local storage.');
//     }

//     console.log('User ID , name from localStorage:', name);
//   }

//   async fetchCarDetails(userId: string) {
//     try {
//       const data: CarDetails[] = await this.carDetailsService.getCarDetailsByUserId(userId);
//       if (data.length > 0) {
//         this.carDetails = data[0];
//         console.log('Car details:', this.carDetails);
//       } else {
//         console.warn('No car details found for user:', userId);
//       }
//     } catch (error) {
//       console.error('Error retrieving car details:', error);
//     }
//   }

//   openModal() {
//     this.showModal = true;
//   }

//   closeModal() {
//     this.showModal = false;
//   }

//   handleClick() {
//     this.openModal();
//     this.takeCar();
//   }

//   async takeCar() {
//     if (this.userDetails && this.carDetails) {
//         const smsNotificationData = {
//             UserName: this.userDetails.name,
//             cygid: this.userDetails.cygid,
//             CarModel: this.carDetails.carModel,
//             CarNumber: this.carDetails.carNumber,
//             PhoneNumber: this.userDetails.phoneNumber,
//             Email: this.userDetails.email
//         };

//         const notificationData = {
//             userName: this.userDetails.name,
//             phoneNumber: this.userDetails.phoneNumber,
//             carNumber: this.carDetails.carNumber,
//             carModel: this.carDetails.carModel,
//             userEmail: this.userDetails.email,
//         };

//         try {
//             const [smsResponse, tableResponse] = await Promise.all([
//                 fetch('http://localhost:5221/api/VehicleStatus/notify-valet', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(smsNotificationData)
//                 }),
//                 fetch('http://localhost:5221/valet/notifications', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(smsNotificationData)
//                 })
//             ]);

//             const [smsResult, tableResult] = await Promise.all([
//                 smsResponse.json(),
//                 tableResponse.json()
//             ]);

//             console.log('SMS notification sent:', smsResult);
//             console.log('Table notification created:', tableResult);

//             this.openModal();
//         } catch (error) {
//             console.error('Error in notification process:', error);
//         }
//     }
// }
// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserDetailsService } from '../../Services/user-details/user.details.service';
import { CarDetailsService } from '../../Services/car-details/cardetails.service';
import { ValetService } from '../../Services/valet-details/valet.service';

interface UserDetails {
  id: number;
  cygid: string;
  name: string;
  phoneNumber: string;
  email: string;
}

interface CarDetails {
  carNumber: string;
  carModel: string;
  status: string;
}

interface ValetDetails {
  name: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
  providers: [UserDetailsService, CarDetailsService, ValetService]
})
export class UserHomePageComponent implements OnInit, OnDestroy {
  showModal = false;
  userDetails: UserDetails | null = null;
  carDetails: CarDetails | null = null;
  valetDetails: ValetDetails | null = null;  // Added valetDetails field
  private statusInterval: any;

  constructor(
    private userDetailsService: UserDetailsService,
    private carDetailsService: CarDetailsService,
    private valetService: ValetService // Injected ValetService
  ) {}

  async ngOnInit() {
    const userId = localStorage.getItem('Id');
    const name = localStorage.getItem('name');

    if (userId) {
      await this.initializeUserAndCarDetails(userId);
      this.startStatusRefresh(userId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  ngOnDestroy() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
  }

  async fetchValetDetails() {
    const valetId = 2; // Replace with dynamic logic if needed
    try {
      this.valetDetails = await this.valetService.getValetDetails(valetId).toPromise();
      console.log('Valet details fetched:', this.valetDetails);
    } catch (error) {
      console.error('Error retrieving valet details:', error);
    }
  }

  private async initializeUserAndCarDetails(userId: string) {
    try {
      this.userDetails = await this.userDetailsService.getUserDetailsById(userId);
      if (this.userDetails) {
        localStorage.setItem('name', this.userDetails.name);
        await this.fetchCarDetails(userId);
        await this.fetchValetDetails(); // Added to fetch valet details
      }
      console.log('User details initialized:', this.userDetails);
    } catch (error) {
      console.error('Error initializing details:', error);
    }
  }

  private startStatusRefresh(userId: string) {
    this.statusInterval = setInterval(async () => {
      try {
        const data: CarDetails[] = await this.carDetailsService.getCarDetailsByUserId(userId);
        if (data.length > 0) {
          this.carDetails = data[0];
          console.log('Car status refreshed:', this.carDetails);
        }
      } catch (error) {
        console.error('Error refreshing car status:', error);
      }
    }, 2000);
  }

  async fetchCarDetails(userId: string) {
    try {
      const data: CarDetails[] = await this.carDetailsService.getCarDetailsByUserId(userId);
      if (data.length > 0) {
        this.carDetails = data[0];
        console.log('Car details fetched:', this.carDetails);
      } else {
        console.warn('No car details found for user:', userId);
      }
    } catch (error) {
      console.error('Error retrieving car details:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleClick() {
    this.openModal();
    this.takeCar();
  }

  async takeCar() {
    if (this.userDetails && this.carDetails) {
      const smsNotificationData = {
        UserName: this.userDetails.name,
        cygid: this.userDetails.cygid,
        CarModel: this.carDetails.carModel,
        CarNumber: this.carDetails.carNumber,
        PhoneNumber: this.userDetails.phoneNumber,
        Email: this.userDetails.email
      };

      try {
        const [smsResponse, tableResponse] = await Promise.all([
          fetch('http://localhost:5221/api/VehicleStatus/notify-valet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(smsNotificationData)
          }),
          fetch('http://localhost:5221/valet/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(smsNotificationData)
          })
        ]);

        const [smsResult, tableResult] = await Promise.all([
          smsResponse.json(),
          tableResponse.json()
        ]);

        console.log('Notifications sent successfully:', { sms: smsResult, table: tableResult });
        this.openModal();
      } catch (error) {
        console.error('Error in notification process:', error);
      }
    }
  }
}
