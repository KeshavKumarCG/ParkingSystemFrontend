import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  private baseUrl = 'http://localhost:5221/api/CarDetails';

  constructor() {}

  async getCarDetailsByUserId(userId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
}
