import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {FilterOptions} from '../models/FilterOptions'
import { UserDataResponse } from '../models/UserDataResponse';
import { UserTableResponse } from '../models/UserTableResponse';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
url:string=environment.apiUrl;
  constructor(public httpClient:HttpClient) { }

  getUsersList(filterOptions: FilterOptions, page:number=0, size:number=10){
    let token:string = ""
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
        params: new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
      };
      return this.httpClient.post<UserTableResponse>(`${this.url}view/users?page=${page}&size=${size}`, filterOptions);
  }
}