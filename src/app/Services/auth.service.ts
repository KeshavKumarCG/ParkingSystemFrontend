import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5221/api/Auth/login'; // Your login API endpoint

  // Login function using fetch API
  login(credentials: { emailOrPhone: string; password: string }): Observable<any> {
    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then(response => response.json())
    );
  }

  // Check if the user is authenticated based on the token
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token !== null && !this.isTokenExpired(token); // Check token existence and expiration
    }
    return false; // Not authenticated if localStorage is not available
  }

  // Get user role from the token
  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
          return payload.role; // Assuming the role is stored in the token payload
        } catch (e) {
          console.error('Error decoding token', e);
        }
      }
    }
    return null;
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp; // Expiration time in the token (UNIX timestamp)
      return exp ? (Math.floor(Date.now() / 1000) > exp) : false;
    } catch (e) {
      console.error('Error checking token expiration', e);
      return true; // Assume expired on error
    }
  }
}
