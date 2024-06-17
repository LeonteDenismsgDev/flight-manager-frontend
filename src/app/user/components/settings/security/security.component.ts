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

  passwordFormUsername:string="";
  passwordFormPassword:string="";
  passwordFormRPassword:string="";

  passwordChangeRequested:boolean=true;

  beginPasswordChange(){
    this.passwordChangeRequested = true;
  }
}
