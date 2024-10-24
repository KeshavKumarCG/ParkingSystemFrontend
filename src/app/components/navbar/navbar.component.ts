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
    console.log('User logged out');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getuserName(){ 
    const name = localStorage.getItem('name');
    return name;
  }

  goToHome() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate([`/user/home/${token}`]);
    } else {
      console.error('No token found in local storage.');
      this.router.navigate(['/login']);
    }
  }
}
