
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { FlightTemplateTableResponse } from '../models/FlightTemplateTableResponse';
import { Attribute, RegisterAttribute, ViewAttributes } from '../models/Attribute';
import { ServiceResponse } from '../models/ServiceResponse';
import { FlightTemplate, UpdateFlightTemplate } from '../models/FlightTemplate';

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

  saveAttribute(attribute:RegisterAttribute){
    return this.http.post(`${environment.apiUrl}attribute/save`,attribute,{responseType: 'text'});
  }

  updateAttribute(attribute:ViewAttributes){
    return this.http.post(`${environment.apiUrl}attribute/update?id=${attribute.id}`,attribute,{responseType: 'text'})
  }

  deleteAttribute(attributeId : string){
    return this.http.delete(`${environment.apiUrl}attribute/delete?id=${attributeId}`,{responseType: 'text'})
  }

  delteTemplate(templateName : string){
    return this.http.delete(`${environment.apiUrl}template/delete?name=${templateName}`,{responseType: 'text'})
  }

  getTemplate(templateName : string){
    const encodedName = encodeURIComponent(templateName);
    return this.http.get<FlightTemplate>(`${environment.apiUrl}template/getTemplate?name=${encodedName}`)
  }

  saveTemplate(template:FlightTemplate){
    return this.http.post(`${environment.apiUrl}template/create`,template,{responseType: 'text'})
  }
  updateTemplate(template:UpdateFlightTemplate){
    return this.http.post(`${environment.apiUrl}template/update`,template,{responseType: 'text'})
  }
}
