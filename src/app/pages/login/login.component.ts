import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/authentication/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { LoaderComponent } from '../../components/loader/loader.component';

interface AuthResponse {
  token: string;
  role: 'User' | 'Valet' | 'Admin';
  id: string;
}

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
  checkingCredentials: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  private handleAuthSuccess(response: AuthResponse, authType: string = 'regular'): void {
    // Store authentication data
    localStorage.setItem('token', response.token);
    localStorage.setItem('Id', response.id);

    // Show success message
    Toastify({
      text: `${authType === 'microsoft' ? 'Microsoft ' : ''}Login successful`,
      style: { background: "green" },
      duration: 1500,
      gravity: 'top',
    }).showToast();

    this.loading = true;

    // Navigate after delay
    setTimeout(() => {
      const routePrefix = {
        User: '/user/home',
        Valet: '/valet/home',
        Admin: '/admin/home'
      }[response.role];

      if (routePrefix) {
        this.router.navigate([`${routePrefix}/${response.id}`]);
      } else {
        Toastify({
          text: "Login successful but unknown role",
          style: { background: "orange" },
          duration: 3000,
          gravity: 'top',
        }).showToast();
      }
    }, 1000);
  }

  private handleAuthError(error: any, authType: string = 'regular'): void {
    let errorMessage = 'Login failed';
    
    if (error?.status === 401) {
      errorMessage = "Invalid credentials";
    } else if (error?.message) {
      errorMessage += `: ${error.message}`;
    } else if (error?.status) {
      errorMessage += ` (Status: ${error.status})`;
    }

    Toastify({
      text: authType === 'microsoft' ? 'Microsoft login failed' : errorMessage,
      style: { background: "red" },
      duration: 3000,
      gravity: 'top'
    }).showToast();
  }

  onLogin(): void {
    if (!this.validateForm()) return;

    this.checkingCredentials = true;

    this.authService.login({ 
      emailOrPhone: this.emailOrPhone, 
      password: this.password 
    }).subscribe({
      next: (response: any) => {
        this.checkingCredentials = false;
        this.handleAuthSuccess(response);
      },
      error: (error: any) => {
        this.checkingCredentials = false;
        this.handleAuthError(error);
      }
    });
  }

  onMicrosoftLogin(): void {
    this.checkingCredentials = true;
    
    this.authService.loginWithMicrosoft().subscribe({
      next: (response: any) => {
        this.checkingCredentials = false;
        this.handleAuthSuccess(response, 'microsoft');
      },
      error: (error: any) => {
        this.checkingCredentials = false;
        this.handleAuthError(error, 'microsoft');
      }
    });
  }

  private validateForm(): boolean {
    if (!this.emailOrPhone.trim()) {
      Toastify({
        text: "Please enter your email or phone number",
        style: { background: "red" },
        duration: 3000,
        gravity: 'top'
      }).showToast();
      return false;
    }

    if (!this.password) {
      Toastify({
        text: "Please enter your password",
        style: { background: "red" },
        duration: 3000,
        gravity: 'top'
      }).showToast();
      return false;
    }

    return true;
  }
}