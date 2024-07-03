import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EditUserRequest } from 'src/app/user/models/EditUserRequest';
import { UserDataRequest } from 'src/app/user/models/UserDataRequest';
import { UserDataResponse } from 'src/app/user/models/UserDataResponse';
import { EditModeService } from '../../services/edit-mode.service';
import { UserDataService } from '../../services/user-data.service';
import { DialogData } from '../../models/dialogData';
import { EditUserRequestAdmin } from '../../models/editUserRequestAdmin';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-standalone-settings',
  templateUrl: './standalone-settings.component.html',
  styleUrls: ['./standalone-settings.component.scss']
})
export class StandaloneSettingsComponent {
  
  @Input() data:DialogData = new DialogData("","","","","","",[],false);
  @Input() editMode:boolean = false;

  addingContact:boolean=false;

  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"];

  enabled:boolean = true;

  //default values
  _firstName:string="";
  _lastName:string="";
  _address:string="";
  _contactData:{key:string,value:string}[] = [];
  _company:string="";
  _role:string="";
  _enabled:boolean = true;

  _newContactKey:string="";
  _newContactValue:string="";
  saveEnabled:boolean= false;

  passwordOK:boolean = false;
  mainRegex= new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W{!_}]).+$');

  passwordFormUsername:string="";
  passwordFormPassword:string="";
  passwordFormRPassword:string="";

  passwordChangeRequested:boolean=false;
  

  constructor(private userDataService:UserDataService, private editModeService:EditModeService, private cdr:ChangeDetectorRef, private securityService:SecurityService){}

  onEditSwitch() {
    // this.editMode = !this.editMode;
    console.log(this.data.role)
    if(!this.editMode){
      this.revertChanges();
      this.abortAddContact();
      this.cdr.detectChanges();
    }else{
      this._firstName = this.data.firstName;
      this._lastName = this.data.lastName;
      this._address = this.data.address;
      this._contactData = JSON.parse(JSON.stringify(this.data.contactData));
      this._company = this.data.company;
      this._role = this.data.role;
      this._enabled = this.data.enabled
    }
    this.addingContact = false;
    this.cdr.markForCheck();
    console.log(this.data)
  }

  onSaveButton(event:Event){
    this.refreshSaveState();
    if(!this.saveEnabled) return;
    let c_map:{[key:string]:string} = {}
    for(let i = 0; i < this.data.contactData.length; i++){
      let key = this.data.contactData[i].key;
      c_map[key] = this.data.contactData[i].value;
    }
    
    this.userDataService.editUserDataAdmin(new EditUserRequestAdmin(this.data.username,this.data.firstName,this.data.lastName,c_map,this.data.address,this.data.role,this.data.company,this.data.enabled)).subscribe(
      ()=>{
        this._address = this.data.address;
        this._firstName = this.data.firstName;
        this._lastName = this.data.lastName;
        this._company = this.data.company;
        this._role = this.data.role;
        this._contactData = JSON.parse(JSON.stringify(this.data.contactData));
        this._enabled = this.data.enabled;
        this.cdr.detectChanges();}
    );
    if(this._enabled != this.data.enabled){
      this.userDataService.switchEnabled(this.data.username).subscribe(()=>{
        
      })
    }
  }

  compareMaps(map1:{key:string,value:string}[],map2:{key:string,value:string}[]):boolean{
    if(map1.length !== map2.length) return false;
    for(let i = 0; i < map1.length; i++){
      let pair1 = map1[i],pair2=map2[i];
      if(!(pair1.key === pair2.key && pair1.value === pair2.value)) return false;
    }
    return true;
  }

  refreshSaveState(){
    this.saveEnabled = this.editMode &&(
      this.data.firstName !==this._firstName || 
      this.data.lastName !== this._lastName ||
      this.data.address !== this._address ||
      !this.compareMaps(this.data.contactData,this._contactData)) ||
      this.data.company  !== this._company || 
      this.data.role !== this._role ||
      this.data.enabled !== this._enabled;
  }

  deleteContactData(key:string){
    let __contactData:{key:string,value:string}[] = [];

    for(let i = 0; i < this.data.contactData.length; i++){
      let r_key = this.data.contactData[i].key;
      let r_value = this.data.contactData[i].value;
      if(r_key != key){
        __contactData.push({key:r_key,value:r_value});
      }
    }
    this.data.contactData=__contactData;
    this.cdr.markForCheck();
    this.refreshSaveState();
  }

  revertChanges(){
    this.data.firstName = this._firstName;
    this.data.lastName = this._lastName;
    this.data.address = this._address;
    this.data.contactData = JSON.parse(JSON.stringify(this._contactData));
    this.data.company = this._company;
    this.data.role = this._role;
    this.data.enabled = this._enabled;
    this.refreshSaveState();
    this.cdr.markForCheck();
  }

  enterAddContactMode(){
    this.addingContact = true;
    this.cdr.markForCheck();
  }

  abortAddContact(){
    this.addingContact = false;
    this._newContactKey = "";
    this._newContactValue = "";
  }

  acceptNewContact(){
    this._newContactKey = this._newContactKey.trim();
    this._newContactValue = this._newContactValue.trim();
    if(this._newContactKey.length == 0 || this._newContactValue.length==0) return;
    if(!this.addingContact) return;
    
    this.data.contactData.push({key:this._newContactKey,value:this._newContactValue});
    this.addingContact = false;
    this._newContactKey = "";
    this._newContactValue = "";
    this.refreshSaveState();
    this.cdr.markForCheck();
  }

  edit(){
    this.editMode = false;
    this.revertChanges();
    this.abortAddContact();
    this.cdr.detectChanges();
  }

  beginPasswordChange(){
    this.passwordChangeRequested = true;
    this.passwordFormUsername="";
    this.passwordFormPassword="";
    this.passwordFormRPassword="";
  }

  refreshRegex(){
    if(!this.mainRegex.test(this.passwordFormPassword)){
      this.passwordOK  = false;
      return;
    }
    if(this.passwordFormPassword !== this.passwordFormRPassword) {
      this.passwordOK  = false;
      return;}
    if(this.passwordFormUsername !== this.data.username) {
      this.passwordOK  = false;
      return;
    }
    this.passwordOK = true;
  }

  changePassword(){
    this.securityService.resetPasswordRequest(this.passwordFormPassword,this.passwordFormUsername).subscribe();
    this.passwordChangeRequested = false;
  }
}
