import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import { CompanyDataModel } from '../../models/CompanyDataModel';
import { UpdateCompany } from '../../models/UpdateCompany';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit{

  data:CompanyDataModel = new CompanyDataModel("",0,[],0);
  _data:CompanyDataModel = new CompanyDataModel("",0,[],0);

  editMode:boolean = false;
  addingContact:boolean = false;
  canSave:boolean = false;
  newContactKey:string="";
  newContactValue:string="";

  constructor(private service:CompanyService, private cdr:ChangeDetectorRef){}

  ngOnInit(){
    this.getData();
  }

  enableAddingContact(){
    this.addingContact = !this.addingContact;
  }

  getData(){
    this.service.getDataCurrent().subscribe((currentCompany:Company)=>{
      this.data.name=currentCompany.name;
      this.data.crews=currentCompany.crews;
      this.data.fleet=currentCompany.fleet;
      this.data.contactData = [];
      Object.keys(currentCompany.contactData).forEach(key => {
        const value = currentCompany.contactData[key];
        this.data.contactData.push({key,value})
      });
      this._data = JSON.parse(JSON.stringify(this.data));
      this.refreshSaveState();
    })
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
    this.canSave = this.editMode &&
    (this.data.name != this._data.name ||
      !this.compareMaps(this.data.contactData,this._data.contactData));
    this.cdr.detectChanges();
  }

  addContact(){
    if(!this.editMode || !this.addingContact) return;
    if(this.newContactKey.trim().length == 0 || this.newContactValue.trim().length == 0)return;
    this.data.contactData.push({"key":this.newContactKey,"value":this.newContactValue});
    this.newContactKey = "";
    this.newContactValue = "";
    this.addingContact = false;
    this.refreshSaveState();
  }

  revert(){
    if(!this.canSave) return;
    this.data = JSON.parse(JSON.stringify(this._data));
    this.refreshSaveState();
    this.cdr.detectChanges();
  }

  deleteContact(key:string){
    let contactData:{
      key:string,
      value:string
    }[] = [];
    for(let _contactData of this.data.contactData){
      if(_contactData.key != key){
        contactData.push(_contactData);
      }
    }
    this.data.contactData=contactData;
    this.refreshSaveState();
  }

  editCompany(){
    this.refreshSaveState();
    if(!this.canSave) return;
    let c_map:{[key:string]:string} = {}
    for(let i = 0; i < this.data.contactData.length; i++){
      let key = this.data.contactData[i].key;
      c_map[key] = this.data.contactData[i].value;
    }
    let request:UpdateCompany = new UpdateCompany(this.data.name,c_map);
    this.service.editCompany(this._data.name,request).subscribe(()=>{});
    this.getData();
  }

  editModeSwitch(){
    if(!this.editMode){
      this.revert();
      this.refreshSaveState();
    }
  }
}
