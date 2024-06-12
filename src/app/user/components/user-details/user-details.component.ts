import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  menuItems: MenuItem[] | undefined;
  ngOnInit(){
    this.menuItems = [
      {
        label:'User Informations',
        route:'/home/users/details/settings/general'
      },
      {
        label:'Security',
        route: '/home/users/details/settings/security'
      }
    ]
  }
}
