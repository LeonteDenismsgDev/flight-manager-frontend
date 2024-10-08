import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSecurity } from './security/services/user-security';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(private router: Router){
    
  }
  ngOnInit(){
    if(!UserSecurity.getItem('token')){
      this.router.navigate(['/login'])
    }
  }
  title = 'manager-frontend';
}
