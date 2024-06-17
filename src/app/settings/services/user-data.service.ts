import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { UserDataRequest } from '../../user/models/UserDataRequest';
import { UserDataResponse } from '../../user/models/UserDataResponse';
import { EditUserRequest } from '../../user/models/EditUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(public httpClient:HttpClient) { }

  getUserData(request:UserDataRequest){
    return this.httpClient.get<UserDataResponse>(`http://localhost:8080/flymanager/view/user?username=${request.username}`);
  }

  editUserData(request:EditUserRequest){
    return this.httpClient.put(`http://localhost:8080/flymanager/user/crew/update`,request);
  }
}