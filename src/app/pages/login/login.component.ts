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
        this.checkingCredentials = false; 
        if (response && response.token && response.role && response.id) {
          localStorage.setItem('token', response.token); 
          localStorage.setItem('Id', response.id);

          Toastify({
            text: "Login successful",
            style: { background: "green" },
            duration: 1500,
            gravity: 'top',
          }).showToast();

          this.loading = true; 
          
          setTimeout(() => {
            if (response.role === 'User') {
              this.router.navigate([`/user/home/${response.id}`]);
            } else if (response.role === 'Valet') {
              this.router.navigate([`/valet/home/${response.id}`]);
            }
          }, 1000); 
        } else {
          Toastify({
            text: "Login failed: Invalid response",
            style: { background: "red" },
            duration: 3000
          }).showToast();
        }
      },
      error: (error: any) => {
        this.checkingCredentials = false; 
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
