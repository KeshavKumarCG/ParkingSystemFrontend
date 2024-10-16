import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';
  errorMessage: string | null = null;

  private loginUrl = 'https://localhost:7044/api/Auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = {
      emailOrPhone: this.emailOrPhone,
      password: this.password,
    };

    this.http.post(this.loginUrl, payload).subscribe(
      (response: any) => {
        // Assuming the response contains a token and user role
        localStorage.setItem('token', response.token);
        this.redirectUser(response.role); // Pass the user role to the redirect function
      },
      (error: any) => {
        this.errorMessage = 'Login failed';
      }
    );
  }

  redirectUser(role: string) {
    if (role === 'User') {
      this.router.navigate(['/user/home']); // Adjust the path as per your routes
    } else if (role === 'Valet') {
      this.router.navigate(['/valet/home']); // Adjust the path as per your routes
    } else {
      this.router.navigate(['/']); // Default to home or login page
    }
  }
}
