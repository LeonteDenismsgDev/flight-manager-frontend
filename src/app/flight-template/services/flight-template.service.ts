import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { FlightTemplateTableResponse } from '../models/FlightTemplateTableResponse';
import { ViewAttributes } from '../models/Attribute';

@Injectable({
  providedIn: 'root'
})
export class FlightTemplateService {

  constructor(private http:HttpClient) { }
  
  getTableData(page:number, size:number){
    return this.http.get<FlightTemplateTableResponse>(`${environment.apiUrl}template/view?page=${page}&size=${size}`);
  }

  getAvailableAttributes(){
    return this.http.get<ViewAttributes[]>(`${environment.apiUrl}attribute/view`);
  }
}
