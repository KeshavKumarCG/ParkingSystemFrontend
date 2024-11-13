import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ emailOrPhone: this.emailOrPhone, password: this.password }).subscribe({
      next: (response: any) => {
        if (response && response.token && response.userId && response.role) {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('role', response.role.toString());

          Toastify({
            text: "Login successful",
            style: { background: "green", marginTop: "52px" },
            duration: 2000,
            gravity: 'top',
          }).showToast();

          switch (response.role) {
            case 3: 
              this.router.navigate([`/user/home/${response.userId}`]);
              break;
            case 2:
              this.router.navigate([`/valet/home/${response.userId}`]);
              break;
            case 1: 
              this.router.navigate([`/admin/home/${response.userId}`]);
              break;
            default:
              console.warn('Unknown role, redirecting to default page');
              this.router.navigate(['/login']);
          }
        } else {
          console.error('Invalid response structure', response);
          Toastify({
            text: "Login failed: Invalid response",
            style: { background: "red" },
            duration: 3000,
            gravity: 'top',
          }).showToast();
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
        const errorMessage = error.status === 401 ? "Login failed: Unauthorized" : "Login failed";
        Toastify({
          text: errorMessage,
          style: { background: "red" },
          duration: 3000,
          gravity: 'top',
        }).showToast();
      }
    });
  }
}
