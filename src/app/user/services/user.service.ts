import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {FilterOptions} from '../models/FilterOptions'
import { UserDataResponse } from '../models/UserDataResponse';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
url:string=environment.apiUrl+'flymanager/view';
  constructor(public httpClient:HttpClient) { }
  getUsersList(filterOptions: FilterOptions, page:number=0, size:number=10){
    let token:string = ""
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': token
        }),
        params: new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
      };
      console.log(options)
      return this.httpClient.post<UserDataResponse[]>(`${this.url}/users`, filterOptions, options);
  }
}