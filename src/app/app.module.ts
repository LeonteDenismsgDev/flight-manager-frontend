import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginComponent } from './security/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SecurityModule } from './security/security.module';

const appRoutes: Routes = [
  {path: 'home',component:HomePageComponent},
  {path: 'login', component:LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    SecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
