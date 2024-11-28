import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ValetService {
  private apiUrl =  `${environment.apiUrl}Valet`; 

  constructor(private http: HttpClient) {}

  // Method to get valet details by ID
  getValetDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
