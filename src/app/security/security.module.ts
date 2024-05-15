import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
