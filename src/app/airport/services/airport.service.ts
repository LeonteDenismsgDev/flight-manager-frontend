import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from '../models/Airport';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get<Airport[]>(environment.apiUrl+'airport/list');
  }

  submitAirport(airport:Airport){
    return this.http.post<string>(environment.apiUrl+"airport/save",airport);
  }
}
