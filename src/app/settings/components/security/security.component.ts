import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { UserDataService } from '../../services/user-data.service';
import { UserDataRequest } from 'src/app/user/models/UserDataRequest';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';
import { UserSecurity } from 'src/app/security/services/user-security';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit{
  role:string = "";
  username:string|null=UserSecurity.getItem("username");
  company:string="";
  passwordOK:boolean = false;
  mainRegex= new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W{!_}]).+$');

  passwordFormUsername:string="";
  passwordFormPassword:string="";
  passwordFormRPassword:string="";

  passwordChangeRequested:boolean=false;

  constructor(private securityService:SecurityService, private userService:UserDataService){}

  ngOnInit(){
    this.userService.getUserData(new UserDataRequest(this.username)).subscribe((userDataResponse:UserDataResponse)=>{
      this.role = userDataResponse.role;
      UserSecurity.setItem("role",this.role);
      this.company = userDataResponse.company;
    }); 
  }


  beginPasswordChange(){
    this.passwordChangeRequested = true;
    this.passwordFormUsername="";
    this.passwordFormPassword="";
    this.passwordFormRPassword="";
  }

  refreshRegex(){
    if(!this.mainRegex.test(this.passwordFormPassword)){
      this.passwordOK  = false;
      return;
    }
    if(this.passwordFormPassword !== this.passwordFormRPassword) {
      this.passwordOK  = false;
      return;}
    if(this.passwordFormUsername !== this.username) {
      this.passwordOK  = false;
      return;
    }
    this.passwordOK = true;
  }

  changePassword(){
    this.securityService.resetPasswordRequest(this.passwordFormPassword,this.passwordFormUsername).subscribe();
    this.passwordChangeRequested = false;
  }
}
