import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogData } from 'src/app/settings/models/dialogData';
import { UserDataService } from 'src/app/settings/services/user-data.service';
import { AddUserRequest } from '../../models/AddUserResquest';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"];
  data:DialogData = new DialogData("","","","","","",[], false)
  saveEnabled:boolean=false;
  email:string=""

  constructor(private service:UserDataService, private cdr:ChangeDetectorRef){}

  refreshSaveState(){
    this.saveEnabled =  this.data.firstName !== "" &&
      this.data.lastName !== "" &&
      this.data.address !== "" &&
      this.email !== "" &&
      this.data.company !== "" &&
      this.data.role !== "";
  }

  onSaveButton(event:Event){
    this.data.contactData.push({key:"email", value:this.email})
    this.refreshSaveState();
    if(!this.saveEnabled) return;
    let c_map:{[key:string]:string} = {}
    for(let i = 0; i < this.data.contactData.length; i++){
      let key = this.data.contactData[i].key;
      c_map[key] = this.data.contactData[i].value;
    }
    let request:AddUserRequest = new AddUserRequest(this.data.firstName,this.data.lastName,c_map,this.data.address,this.data.company,this.data.role);
    this.service.addNewUser(request).subscribe(()=>{});
  }
}
