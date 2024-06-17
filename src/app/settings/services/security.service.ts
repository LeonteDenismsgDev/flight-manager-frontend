import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UpdatePasswordRequest } from "../../user/models/UpdatePasswordRequest";
import { environment } from "environment";

@Injectable({
    providedIn: 'root'
  })
  export class SecurityService{
    constructor(private http:HttpClient){}

    resetPasswordRequest(newPassword:string, username:string){
      return this.http.put<string>(environment.apiUrl+"user/password/update",new UpdatePasswordRequest(username, newPassword));   
    }
  }