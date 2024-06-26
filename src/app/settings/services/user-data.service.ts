import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { UserDataRequest } from '../../user/models/UserDataRequest';
import { UserDataResponse } from '../../user/models/UserDataResponse';
import { EditUserRequest } from '../../user/models/EditUserRequest';
import { AddUserRequest } from 'src/app/user/models/AddUserResquest';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(public httpClient:HttpClient) { }

  getUserData(request:UserDataRequest){
    return this.httpClient.get<UserDataResponse>(environment.apiUrl + `view/user?username=${request.username}`);
  }

  editUserData(request:EditUserRequest){
    return this.httpClient.put(environment.apiUrl + `user/crew/update`,request);
  }

  editUserDataAdmin(request:EditUserRequest){
    return this.httpClient.put(environment.apiUrl + `user/admin/update`,request);
  }

  addNewUser(request:AddUserRequest){
    return this.httpClient.post<string>(environment.apiUrl + "user/register", request);
  }
}