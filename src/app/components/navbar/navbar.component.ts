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
    
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    this.router.navigate(['/login']);
  }

  getuserName(){ 
    const name = localStorage.getItem('name');
    return name;
  }

  goToHome() {
    const id = localStorage.getItem('Id');
    if (id) {
      this.router.navigate([`/user/home/${id}`]);
    } else {
      console.error('No token found in local storage.');
      this.router.navigate(['/login']);
    }
  }
}
