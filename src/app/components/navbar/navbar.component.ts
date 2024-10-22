import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform logout logic here, e.g., clearing tokens, etc.
    console.log('User logged out');
    // Clear local storage
    localStorage.clear();
    // Redirect to login or home page
    this.router.navigate(['/login']);
  }

  getuserName(){ 
    const name = localStorage.getItem('name');
    return name
  }

  goToHome() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); // Change 'token' to whatever key you use for your token
    if (token) {
      // Redirect to user home with token as a route parameter
      this.router.navigate([`/user/home/${token}`]);
    } else {
      // Handle case when token is not found (optional)
      console.error('No token found in local storage.');
      // Optionally redirect to a default page
      this.router.navigate(['/login']);
    }
  }
}
