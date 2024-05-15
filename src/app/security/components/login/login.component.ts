import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = this.fb.group({
    password: ['',Validators.required],
    userName:   ['',Validators.required],
  });

ngOnInit(){
}
constructor(private router:Router, private fb: FormBuilder){

}
onLogin(){
  // this.router.navigate(["/home"]);
  
}

}
