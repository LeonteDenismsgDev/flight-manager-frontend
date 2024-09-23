import { Component } from '@angular/core';
import { DialogData } from 'src/app/settings/models/dialogData';
import { FilterOptions } from 'src/app/user/models/FilterOptions';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';
import { UserTableResponse } from 'src/app/user/models/UserTableResponse';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent {

  lastPage:boolean = false;
  editable:boolean = false;
  user_list:UserDataResponse[]= [];
  columns = ["Username","First name","Last name","Address","Email", "Role"]
  dialogUserData:DialogData=new DialogData("","","","","","",[], false);
  options = [
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50}
  ]

  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"]

  keys:string[]=[
    "username","firstName","lastName","address","email","role"
  ]
  max_users:number = 0;
  max_page:number = 0;
  page:number=0;
  size:number=10;
  filterOptions:FilterOptions = new FilterOptions('','',[]);
  sidebarVisible: boolean = false;
  visibleDialog=false;
  addUserDialog=false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.refreshTable();
  } 


  filter(){
    this.userService.getUsersList(this.filterOptions,this.page,this.size).subscribe(
      (usersList:UserTableResponse) =>{
        if(usersList.usersCount > 0){
          this.user_list = usersList.page;
          this.max_users = usersList.usersCount;
          this.max_page = Math.ceil(usersList.usersCount/((this.page+1)*this.size));
          if(this.max_users <= this.size)
          {
            this.max_page = 0;
          }
        }
      }
    )
  }


  changePaginator(){
    this.refreshTable()
  }

  addPage(){
    //add max page constraint
    if(this.page >= this.max_page) return;
    this.page+=1;
    this.refreshTable();
  }

  refreshTable(){
    this.userService.getUsersList(this.filterOptions,this.page,this.size).subscribe(
      (usersList:UserTableResponse) =>{
        if(usersList.usersCount > 0){
          this.user_list = usersList.page;
          this.max_users = usersList.usersCount;
          this.max_page = Math.ceil(usersList.usersCount/((this.page+1)*this.size));
          if(this.max_users <= this.size)
            {
              this.max_page = 0;
            }
        }
      }
    )
  }

  removePage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.refreshTable()
  }

}
