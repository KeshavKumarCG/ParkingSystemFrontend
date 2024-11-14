import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { LoaderComponent } from '../../components/loader/loader.component'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';
  loading: boolean = false;
  checkingCredentials: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.emailOrPhone || !this.password) {
      Toastify({
        text: "Please fill in all fields",
        style: { background: "red" },
        duration: 3000,
        gravity: 'top',
      }).showToast();
      return;
    }

    this.checkingCredentials = true;
    this.loading = true;

    this.authService.login({ emailOrPhone: this.emailOrPhone, password: this.password }).subscribe({
      next: (response: any) => {

        if (response) {
          this.authService.isAuthenticated();
          this.checkingCredentials = false;
          this.loading = false;
          Toastify({
            text: "Login successful",
            style: { background: "green" },
            duration: 1500,
            gravity: 'top',
          }).showToast();
          const role = response.role;
          if (role === "User") {
            this.router.navigate([`user/home/${response.userId}`]);
          } else if (role === "Valet") {
            this.router.navigate([`valet/home/${response.userId}`]);
          } else if (role === "Admin") {
            this.router.navigate([`admin/home/${response.userId}`]);
          } else {
            console.warn('Unknown role, redirecting to default home page');
            this.router.navigate(['/login']);
          }
        } else {
          console.error('Invalid login response:', response);
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.checkingCredentials = false;
        this.loading = false;
        const errorMessage = error.status === 401 ? "Invalid credentials" : "Login failed. Please try again";
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