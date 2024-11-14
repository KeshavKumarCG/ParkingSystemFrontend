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
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Login failed');
          });
        }
        return response.json();
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role; 
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
    return null;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp && Math.floor(Date.now() / 1000) > payload.exp;
    } catch (e) {
      console.error('Error checking token expiration', e);
      return true;
    }
  }
}