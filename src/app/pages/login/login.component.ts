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
    this.checkingCredentials = true; 
    this.authService.login({ emailOrPhone: this.emailOrPhone, password: this.password }).subscribe({
      next: (response: any) => {
        this.authService.handleLoginResponse(response); 
        Toastify({
          text: "Login successful",
          style: { background: "green" },
          duration: 1500,
          gravity: 'top',
        }).showToast();
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
