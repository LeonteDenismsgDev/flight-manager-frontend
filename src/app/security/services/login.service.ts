import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string=environment.apiUrl+'auth/login';
  constructor(public httpClient:HttpClient) { }

  login(loginRequest: LoginRequest){
    return this.httpClient.post<LoginResponse>(this.url,loginRequest);
  }
}
