import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(){
    this.items = [
      { label: 'Home', icon:'home',route:'/home'},
      { label: 'Users', icon: 'people_alt', route: '/home/users' },
      { label: 'Flights', icon: 'flight_takeoff', route: '/home/flights' },
      { label: 'Planes', icon: 'airplanemode_on', route: '/home/planes' },
      { label: 'Airports', icon: 'connecting_airports', route: '/home/airports' },
      { label: 'Itineraries', icon: 'mode_of_travel', route: '/home/itineraries' },
      { label: 'Employees', icon: 'transfer_within_a_station', route: '/home/employees' },
      { label: 'Companies', icon: 'ssid_chart', route: '/home/companies' }
    ]
  }
}
