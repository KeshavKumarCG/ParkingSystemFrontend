import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private baseUrl = 'http://localhost:5221/api/Users/';

  async getUserDetailsById(id: string | null): Promise<UserDetails> {
    if (!id) {
      id = localStorage.getItem('Id'); // Get the ID from local storage if not provided
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

// Define the UserDetails interface to match the API response
interface UserDetails {
  id: number;
  cygid: string;
  name: string;
  phoneNumber: string; // Changed to phoneNumber to match API response
  email: string;
}
