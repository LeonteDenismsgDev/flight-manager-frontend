import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Airport } from '../models/Airport';
import { environment } from 'environment';
import { AirportRequest } from '../models/AirportRequest';
import { AirportResponse } from '../models/AirportResponse';

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

  getFilteredList(request:AirportRequest){
    return this.http.post<AirportResponse>(environment.apiUrl+"airport/filter",request)
  }

  editAirport(icao:string,airport:Airport){
    return this.http.post<string>(environment.apiUrl+"airport/update?icao="+icao,airport);
  }

  getOneAirport(icao:string){
    return this.http.get<Airport>(environment.apiUrl+"airport/get?icao="+icao);
  }
}
