import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/security/services/login.service';
import { Role } from 'src/app/user/models/role';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router, public loginService:LoginService) {}

  determineAccess(roleList:Role[]){
    let currentRole:string|null = localStorage.getItem("role");
    let found:boolean = false;
    roleList.forEach((role)=>{
      if(currentRole == role){
        found = true;
      }
    })
    return found;
  }

  ngOnInit(){
    this.items = [
      { label: 'Home', icon:'home',route:'/home', hasAccess:this.determineAccess([Role.ad,Role.cm,Role.fm,Role.cr])},
      { label: 'Users', icon: 'people_alt', route: '/home/users',hasAccess:this.determineAccess([Role.ad]) },
      { label: 'Upcoming Flights', icon: 'flight_takeoff', route:'/home/flights', hasAccess:this.determineAccess([Role.cr])},
      { label: 'Flights', icon: 'flight_takeoff', route: '/home/flights', hasAccess:this.determineAccess([Role.ad,Role.fm,Role.cm])},
      { label: 'Planes', icon: 'airplanemode_on', route: '/home/planes',hasAccess:this.determineAccess([Role.ad,Role.cm]) },
      { label: 'Airports', icon: 'connecting_airports', route: '/home/airports',hasAccess:this.determineAccess([Role.ad, Role.cm]) },
      { label: 'Itineraries', icon: 'mode_of_travel', route: '/home/itineraries',hasAccess:this.determineAccess([Role.ad, Role.cm]) },
      { label: 'Employees', icon: 'transfer_within_a_station', route: '/home/employees',hasAccess:this.determineAccess([Role.ad, Role.cm]) },
      { label: 'My Company', icon: 'ssid_chart', route:'/home/companies',hasAccess:this.determineAccess([Role.cr,Role.fm,Role.cm])},
      { label: 'Companies', icon: 'ssid_chart', route: '/home/companies',hasAccess:this.determineAccess([Role.ad]) }
    ]
  }

  logout(){
    this.loginService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  myAccount(){
    
  }
}
