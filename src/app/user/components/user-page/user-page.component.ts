import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FilterOptions } from '../../models/FilterOptions';
import { UserDataResponse } from '../../models/UserDataResponse';
import { DialogData } from 'src/app/settings/models/dialogData';
import { StandaloneSettingsComponent } from 'src/app/settings/components/standalone-settings/standalone-settings.component';
import { UserTableResponse } from '../../models/UserTableResponse';
import { DataTableComponent } from 'src/app/util-components/components/data-table/data-table.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  @ViewChild(StandaloneSettingsComponent) dialog!:StandaloneSettingsComponent;
  lastPage:boolean = false;
  editable:boolean = false;
  user_list:UserDataResponse[]= [];
  columns = ["Username","First name","Last name","Address","Company","Email", "Role"]
  dialogUserData:DialogData=new DialogData("","","","","","",[], false);
  options = [
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50}
  ]

  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"]

  keys:string[]=[
    "username","firstName","lastName","address","company","email","role"
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

  onRowClick(data: UserDataResponse){

    this.visibleDialog = true;
    this.dialogUserData=new DialogData("","","","","","",[], false);
    this.dialogUserData.username = data.username;
    this.dialogUserData.lastName = data.lastName;
    this.dialogUserData.address = data.address;
    this.dialogUserData.company = data.company;
    this.dialogUserData.firstName = data.firstName;
    this.dialogUserData.role = data.role;
    this.dialogUserData.enabled = data.enabled;
    Object.keys(data.contactData).forEach(key => {
      const value = data.contactData[key];
      this.dialogUserData.contactData.push({key,value})
    });
    console.log(this.dialogUserData)
  }

  turnOffEditMode(){
    this.dialog.edit();
    this.abortUpdate();
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

  @ViewChild('planeTable') tableChild!:DataTableComponent;
  
  abortUpdate(){
    this.visibleDialog = false;
    this.tableChild.autoDeselect();
  }

  removePage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.refreshTable()
  }
}
