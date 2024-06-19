import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../services/user.service';
import { FilterOptions } from '../../models/FilterOptions';
import { UserDataResponse } from '../../models/UserDataResponse';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
 user_list:UserDataResponse[]= [];
columns = ["First name","Last name","Address","Company","Email", "Role"]

options = [
  {label: 10, value: 10},
  {label: 20, value: 20},
  {label: 50, value: 50}
]

roles:string[]=["CREW_ROLE","LIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"]

keys:string[]=[
  "firstName","lastName","address","company","email","role"
]
page:number=0;
size:number=10;
filterOptions:FilterOptions = new FilterOptions('','',[]);
selectedOption= {label:10, value:10}
sidebarVisible: boolean = false;


constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.getUsersList(this.filterOptions,this.page,this.size).subscribe(
      (usersList:UserDataResponse[]) =>{
        if(usersList){
          this.user_list = usersList
        }
      }
    )
  } 


  filter(){
    this.userService.getUsersList(this.filterOptions,this.page,this.size).subscribe(
      (usersList:UserDataResponse[]) =>{
        if(usersList){
          this.user_list = usersList
        }
      }
    )
  }
}
