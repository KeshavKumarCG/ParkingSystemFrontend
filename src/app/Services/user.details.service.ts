import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private baseUrl = `http://localhost:5221/api/Users/`;

  async getUserDetailsById(id: string | null): Promise<any> {
    console.log('Input id:', id);  // Log the input id

    if (!id) {
      id = localStorage.getItem('Id');
      console.log('Id from localStorage:', id);  // Log the id from localStorage
    }

    if (!id) {
      console.error('User ID is not available');
      throw new Error('User ID is required to fetch user details.');
    }

    try {
      console.log('Fetching user details for id:', id);  // Log the final id being used
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
        console.error('API error response:', errorDetails);  // Log the error details
        throw new Error(`Failed to fetch user details: ${errorDetails}`);
      }

      const userData = await response.json();
      console.log('User data received:', userData);  // Log the received user data
      return userData;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;  // Re-throw the error instead of returning null
    }
  }
}