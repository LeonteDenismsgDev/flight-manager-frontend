import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plane } from '../models/Plane';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  constructor(private http:HttpClient) {
   }

  getAllPlanes(){
      return this.http.get<Plane[]>(environment.apiUrl+"plane/view/all");
  }

  getOnePlane(tailNumber:string){
      return this.http.get<Plane>(environment.apiUrl+"plane/view?registrationNumber="+tailNumber);
  }

  addPlane(plane:Plane){
      return this.http.post<string>(environment.apiUrl+"plane/save",plane);
  }

  updatePlane(tailNumber:string,plane:Plane){
      return this.http.post<string>(environment.apiUrl+"plane/update?registrationNumber="+tailNumber,plane);
  }

  deletePlane(tailNumber:string){
      return this.http.delete<string>(environment.apiUrl+"plane/delete?registrationNumber="+tailNumber);
  }
}
