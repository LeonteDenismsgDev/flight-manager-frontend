import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FilterOptions } from '../../models/FilterOptions';
import { UserDataResponse } from '../../models/UserDataResponse';
import { DialogData } from 'src/app/settings/models/dialogData';
import { StandaloneSettingsComponent } from 'src/app/settings/components/standalone-settings/standalone-settings.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  @ViewChild(StandaloneSettingsComponent) dialog!:StandaloneSettingsComponent;
  
  editable:boolean = false;
  user_list:UserDataResponse[]= [];
  columns = ["Username","First name","Last name","Address","Company","Email", "Role"]
  dialogUserData:DialogData=new DialogData("","","","","","",[]);
  options = [
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50}
  ]

  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"]

  keys:string[]=[
    "username","firstName","lastName","address","company","email","role"
  ]
  page:number=0;
  size:number=10;
  filterOptions:FilterOptions = new FilterOptions('','',[]);
  sidebarVisible: boolean = false;
  visibleDialog=false;
  addUserDialog=false;

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

  onRowClick(data: UserDataResponse){

    this.visibleDialog = true;
    this.dialogUserData=new DialogData("","","","","","",[]);
    this.dialogUserData.username = data.username;
    this.dialogUserData.lastName = data.lastName;
    this.dialogUserData.address = data.address;
    this.dialogUserData.company = data.company;
    this.dialogUserData.firstName = data.firstName;
    this.dialogUserData.role = data.role;
    Object.keys(data.contactData).forEach(key => {
      const value = data.contactData[key];
      this.dialogUserData.contactData.push({key,value})
    });
    console.log(this.dialogUserData)
  }

  turnOffEditMode(){
    this.dialog.edit();
  }

  changePaginator(){
    this.refreshTable()
  }

  addPage(){
    //add max page constraint
    this.page+=1;
    this.refreshTable();
  }

  refreshTable(){
    this.userService.getUsersList(this.filterOptions,this.page,this.size).subscribe(
      (usersList:UserDataResponse[]) =>{
        if(usersList){
          this.user_list = usersList
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
