import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private baseUrl =  `${environment.apiUrl}Users/`;

  async getUserDetailsById(id: string | null): Promise<UserDetails> {
    if (!id) {
      id = localStorage.getItem('Id'); 
    }

    if (!id) {
      throw new Error('User ID is required to fetch user details.');
    }

    try {
      const response = await fetch(`${this.baseUrl}${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to fetch user details: ${errorDetails}`);
      }

      const userData: UserDetails = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }
}


interface UserDetails {
  id: number;
  cygid: string;
  name: string;
  phoneNumber: string; 
  email: string;
}
