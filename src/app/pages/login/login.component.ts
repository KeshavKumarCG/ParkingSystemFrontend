import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { style } from '@angular/animations';

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
        if (response && response.token && response.role && response.id) {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); 
          localStorage.setItem('Id', response.id); 

          // Show success toast
          Toastify({
            text: "Login successful",
            style: { background: "green" },
            duration: 3000
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
            style: { background: "red" },
            duration: 3000
          }).showToast();
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          Toastify({
            text: "Login failed: Unauthorized",
            style: { background: "red" },
            duration: 3000
          }).showToast();
        } else {
          Toastify({
            text: "Login failed",
            style: { background: "red" },
            duration: 3000
          }).showToast();
        }
      }
    });
  }


  }

