import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../models/login-response';
import { MessageService } from 'primeng/api';
import { UserSecurity } from '../../services/user-security';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    userName: ['',Validators.required],
    password: ['',Validators.required],
  });

ngOnInit(){
}
constructor(private router:Router, private fb: FormBuilder, private service:LoginService, private messageService: MessageService){

}
onLogin(){
  // this.router.navigate(["/home"]);
  const username = this.loginForm.get('userName')?.value;
  const password = this.loginForm.get('password')?.value;
  const loginRequest = new LoginRequest(username, password);
  // UserSecurity.setItem("token","aaaa");
  // this.router.navigate(['/home']);
  this.service.login(loginRequest).subscribe((loginResponse:LoginResponse) =>{
    //check if token is null or blank
    if(!!loginResponse.token?.trim()){
      UserSecurity.setItem("token",`Bearer ${loginResponse.token}`);
      UserSecurity.setItem("username",loginResponse.username);
      UserSecurity.setItem("role",loginResponse.role);
      this.messageService.add({severity:'success',summary:'Logged in',detail:'Log in successfull', life:1000})
      this.router.navigate(['/home']);
    }
  })
}
}
