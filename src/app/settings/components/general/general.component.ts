import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EditUserRequest } from 'src/app/user/models/EditUserRequest';
import { UserDataRequest } from 'src/app/user/models/UserDataRequest';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';
import { EditModeService } from 'src/app/settings/services/edit-mode.service';
import { UserDataService } from 'src/app/settings/services/user-data.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit{

  username=localStorage.getItem("username");
  editMode:boolean=false;
  addingContact:boolean=false;

  firstName:string="";
  lastName:string="";
  address:string="";
  contactData:{key:string,value:string}[] = [];

  //default values
  _firstName:string="";
  _lastName:string="";
  _address:string="";
  _contactData:{key:string,value:string}[] = [];

  _newContactKey:string="";
  _newContactValue:string="";
  saveEnabled:boolean= false;
  

  constructor(private userDataService:UserDataService, private editModeService:EditModeService, private cdr:ChangeDetectorRef){}
  ngOnInit(){
    this.editModeService.editMode$.subscribe((value)=>
    {
      this.editMode=value;
      console.log(this.editMode);
    })

    let data:UserDataResponse;
    //call user refresh
    this.userDataService.getUserData(new UserDataRequest(this.username)).subscribe((userDataResponse:UserDataResponse)=>{
      data = userDataResponse;
      // console.log(data)
      this.address=data.address;
      this._address=data.address;
      this.firstName=data.firstName;
      this._firstName=data.firstName;
      this.lastName=data.lastName;
      this._lastName=data.lastName;
      Object.keys(data.contactData).forEach(key => {
        const value = data.contactData[key];
        this.contactData.push({key,value})
        this._contactData.push({key,value})
      });
    }); 
  }

  onEditSwitch() {
    this.editModeService.switchEditMode(this.editMode);
    this.addingContact = false;
    this.cdr.markForCheck();
  }

  onSaveButton(event:Event){
    this.refreshSaveState();
    if(!this.saveEnabled) return;
    let username = localStorage.getItem("username");
    let c_map:{[key:string]:string} = {}
    for(let i = 0; i < this.contactData.length; i++){
      let key = this.contactData[i].key;
      c_map[key] = this.contactData[i].value;
    }
    
    this.userDataService.editUserData(new EditUserRequest(username,this.firstName,this.lastName,c_map,this.address)).subscribe();
  }

  compareMaps(map1:{key:string,value:string}[],map2:{key:string,value:string}[]):boolean{
    if(map1.length != map2.length) return false;
    for(let i = 0; i < map1.length; i++){
      let pair1 = map1[i],pair2=map2[i];
      if(!(pair1.key == pair2.key && pair1.value == pair2.value)) return false;
    }
    return true;
  }

  refreshSaveState(){
    this.saveEnabled= this.editMode &&(
    this.firstName!=this._firstName || 
    this.lastName != this._lastName ||
    this.address != this._address ||
    !this.compareMaps(this.contactData,this._contactData));
  }

  deleteContactData(key:string){
    let __contactData:{key:string,value:string}[] = [];

    for(let i = 0; i < this.contactData.length; i++){
      let r_key = this.contactData[i].key;
      let r_value = this.contactData[i].value;
      if(r_key != key){
        __contactData.push({key:r_key,value:r_value});
      }
    }
    this.contactData=__contactData;
    this.cdr.markForCheck();
    this.refreshSaveState();
  }

  revertChanges(){
    this.firstName = this._firstName;
    this.lastName = this._lastName;
    this.address = this._address;
    this.contactData = this._contactData;
    this.refreshSaveState();
    this.cdr.markForCheck();
  }

  enterAddContactMode(){
    this.addingContact = true;
    this.cdr.markForCheck();
  }

  abortAddContact(){
    this.addingContact = false;
  }

  acceptNewContact(){
    this._newContactKey = this._newContactKey.trim();
    this._newContactValue = this._newContactValue.trim();
    if(this._newContactKey.length == 0 || this._newContactValue.length==0) return;
    if(!this.addingContact) return;
    
    this.contactData.push({key:this._newContactKey,value:this._newContactValue});
    this.addingContact = false;
    this._newContactKey = "";
    this._newContactValue = "";
    this.refreshSaveState();
    this.cdr.markForCheck();
  }
}
