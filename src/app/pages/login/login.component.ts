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
        console.log('API Response:', response); // Log the response for inspection

        // Check for 'token', 'role', and 'name'
        if (response && response.token && response.role && response.name) {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.name); // Storing name instead of Id

          // Show success toast
          Toastify({
            text: "Login successful",
            style: { background: "green", marginTop: "52px" },
            duration: 2000,
            gravity: 'top',
          }).showToast();

          // Redirect based on user role
          if (response.role === 'User') {
            this.router.navigate([`/user/home/${response.token}`]);
          } else if (response.role === 'Valet') {
            this.router.navigate([`/valet/home/${response.token}`]);
          }
        } else {
          console.error('Invalid response structure', response);
          Toastify({
            text: "Login failed: Invalid response",
            backgroundColor: "red",
            duration: 3000
          }).showToast();
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
        console.log('HTTP Status:', error.status); // Log HTTP status code

        let errorMessage = "Login failed";
        if (error.status === 401) {
          errorMessage = "Login failed: Unauthorized";
        } else if (error.error && error.error.message) {
          errorMessage = `Login failed: ${error.error.message}`;
        }

        Toastify({
          text: errorMessage,
          backgroundColor: "red",
          duration: 3000
        }).showToast();
      }
    });
  }
}
