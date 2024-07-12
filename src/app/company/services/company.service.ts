import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  getDataAdmin(){
    return this.http.get<Company[]>(environment.apiUrl+"company/view/all");
  }

  saveCompany(name:string,email:string){
    return this.http.post<string>(environment.apiUrl+"company/create",{"name":name,"contactData":{"email":email},"fleet":0});
  }

  deleteCompany(name:string){
    return this.http.delete<string>(environment.apiUrl+"company/delete?name="+name);
  }
}
