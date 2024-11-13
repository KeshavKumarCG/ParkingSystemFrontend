import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    this.isUser = role === '1';
    if (!this.isUser) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    console.log('User logged out');
    localStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    this.router.navigate(['/login']);
  }

  goToHome() {
    const userId = localStorage.getItem('userId');
    if (userId && this.isUser) {
      this.router.navigate([`/user/home/${userId}`]); 
    } else {
      console.warn('User ID missing or unauthorized access - redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  getuserName(): string {
    const userName = localStorage.getItem('userName');
    return userName ? userName : 'Guest'; 
  }
}
