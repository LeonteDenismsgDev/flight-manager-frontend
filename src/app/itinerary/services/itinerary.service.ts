import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary';
import { environment } from 'environment';
import { GetItinerary } from '../models/GetItinerary';
import { ItineraryResponse } from '../models/ItineraryResponse';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Itinerary[]>(environment.apiUrl+"itinerary/view/all");
  }

  get(id:string){
    return this.http.get<Itinerary>(environment.apiUrl+"itinerary/view?id="+id);
  }

  delete(id:string){
    return this.http.delete<string>(environment.apiUrl+"itinerary/delete?id="+id);
  }

  update(id:string, itinerary:Itinerary){
    return this.http.post<string>(environment.apiUrl+"itinerary/update?id="+id,itinerary);
  }

  getFiltered(request:GetItinerary){
    return this.http.post<ItineraryResponse>(environment.apiUrl+"itinerary/view/filtered",request);
  }
}
