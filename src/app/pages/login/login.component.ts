import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ emailOrPhone: this.emailOrPhone, password: this.password }).subscribe({
      next: (response) => {
        // Handle successful login, store JWT, and redirect
        console.log('Login successful', response);
        localStorage.setItem('token', response.token); // Store the token (assuming it's in the response)

        // Redirect based on user role (adjust as necessary)
        if (response.role === 'User') {
          this.router.navigate(['/user/home']);
        } else if (response.role === 'Valet') {
          this.router.navigate(['/valet/home']);
        }
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    });
  }
}
