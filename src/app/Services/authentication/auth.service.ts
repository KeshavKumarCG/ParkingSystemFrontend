import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}Auth/login`;;

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

