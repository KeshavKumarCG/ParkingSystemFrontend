import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValetService {
  private apiUrl = 'http://localhost:5221/api/Valet'; // API URL

  constructor(private http: HttpClient) {}

  // Method to get valet details by ID
  getValetDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
