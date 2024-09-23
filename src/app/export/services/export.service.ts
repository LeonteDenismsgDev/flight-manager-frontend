import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExportRequest } from '../models/export-request';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http:HttpClient) { }

  sendRequest(request:ExportRequest){
    return this.http.post(environment.apiUrl + "export",request,{responseType:'blob'});
  }
}
