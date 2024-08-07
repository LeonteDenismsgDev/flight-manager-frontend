import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Interceptor } from './util/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityModule } from './security/security.module';
import { LoginComponent } from './security/components/login/login.component';
import { AuthInterceptor } from './util/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SecurityModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
