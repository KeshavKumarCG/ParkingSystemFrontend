import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
      return payload.role; // Assuming the role is stored in the token payload
    }
    return null;
  }
}
