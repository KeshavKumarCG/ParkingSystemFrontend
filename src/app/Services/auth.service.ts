import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5221/api/Auth/login';

  constructor(private router: Router) {}

  login(credentials: { emailOrPhone: string; password: string }): Observable<any> {
    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then(response => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      })
    );
  }

  handleLoginResponse(response: any): void {
    if (response.token && response.userId && response.role) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem('role', response.role.toString());

     
      if (response.role === 3) {
        
        this.router.navigate([`user/home/${response.userId}`]);
      } else if (response.role === 2) {
      
        this.router.navigate([`valet/home/${response.userId}`]);
      } 
      else if (response.role === 1) {
        this.router.navigate([`admin/home/${response.userId}`]);
      }
      else {
        console.warn('Unknown role, redirecting to default home page');
        this.router.navigate(['/login']);
      }
    } else {
      console.error('Invalid login response:', response);
    }
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      return token !== null && !this.isTokenExpired(token);
    }
    return false;
  }

  getUserRole(): string | null {
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.role; 
        } catch (e) {
          console.error('Error decoding token', e);
        }
      }
    }
    return null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      return exp ? Math.floor(Date.now() / 1000) > exp : false;
    } catch (e) {
      console.error('Error checking token expiration', e);
      return true;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
