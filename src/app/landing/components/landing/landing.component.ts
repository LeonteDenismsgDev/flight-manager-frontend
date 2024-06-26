import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/settings/services/user-data.service';
import { UserDataRequest } from 'src/app/user/models/UserDataRequest';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{
  firstName:string=""
  lastName:string=""

  username=localStorage.getItem("username");

  constructor(private service:UserDataService){}

  ngOnInit(): void {
    this.service.getUserData(new UserDataRequest(this.username)).subscribe((userDataResponse:UserDataResponse)=>{
      this.firstName=userDataResponse.firstName;
      this.lastName=userDataResponse.lastName;
    }); 
  }
}
