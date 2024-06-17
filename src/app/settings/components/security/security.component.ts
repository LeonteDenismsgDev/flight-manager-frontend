import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {
  role:string|null=localStorage.getItem("role");
  username:string|null=localStorage.getItem("username");
  company:string="";
  passwordOK:boolean = false;
  mainRegex= new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$');

  passwordFormUsername:string="";
  passwordFormPassword:string="";
  passwordFormRPassword:string="";

  passwordChangeRequested:boolean=true;

  beginPasswordChange(){
    this.passwordChangeRequested = true;
    this.passwordFormUsername="";
    this.passwordFormPassword="";
    this.passwordFormRPassword="";
  }

  refreshRegex(){
    if(!this.mainRegex.test(this.passwordFormPassword)) return;
    if(this.passwordFormPassword != this.passwordFormRPassword) return;
    this.passwordOK = true;
  }
}
