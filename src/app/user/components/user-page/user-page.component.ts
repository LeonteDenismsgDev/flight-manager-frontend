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
columns = ["id","name","email"]
options = [
  {label: 10, value: 10},
  {label: 20, value: 20},
  {label: 50, value: 50}
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
}
