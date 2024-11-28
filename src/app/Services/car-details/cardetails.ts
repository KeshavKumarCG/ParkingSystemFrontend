import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {
  private baseUrl =  `${environment.apiUrl}CarDetails`;

  constructor() {}

  async getCarDetailsByUserId(userId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
}
