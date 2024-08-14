import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { LoginService } from 'src/app/security/services/login.service';
import { RefreshUser } from 'src/app/user/models/RefreshUser';
import { Role } from 'src/app/user/models/role';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router, public loginService:LoginService, private userService:UserService) {}

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
      { label: 'My Company', icon: 'ssid_chart', route:'/home/company/mycompany',hasAccess:this.determineAccess([Role.cr,Role.fm])},
      { label: 'Companies', icon: 'ssid_chart', route: '/home/company/admin',hasAccess:this.determineAccess([Role.ad]) },
      { label: 'Manage Company', icon: 'ssid_chart', route: '/home/company/manage',hasAccess:this.determineAccess([Role.cm]) }
    ]
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)
    ).subscribe((event)=>{
      this.refreshUser();
    })
  }

  refreshUser(){
    this.userService.getCurrentUser().subscribe((data:RefreshUser)=>{
      localStorage.setItem("username",data.username);
      localStorage.setItem("role",data.role);
    })
  }

  logout(){
    this.loginService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  myAccount(){
    this.router.navigate(['/home/settings/general']);
  }
}
