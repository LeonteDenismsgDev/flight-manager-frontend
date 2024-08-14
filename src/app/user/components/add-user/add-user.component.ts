import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogData } from 'src/app/settings/models/dialogData';
import { UserDataService } from 'src/app/settings/services/user-data.service';
import { AddUserRequest } from '../../models/AddUserResquest';
import { Company } from 'src/app/company/models/company';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  roles:string[]=["CREW_ROLE","FLIGHT_MANAGER_ROLE","COMPANY_MANAGER_ROLE","ADMINISTRATOR_ROLE"];
  data:DialogData = new DialogData("","","","","","",[], false)
  saveEnabled:boolean=false;
  email:string=""
  companies: Company[] = [];
  selectedCompany: Company|null = null;

  constructor(private service:UserDataService, private cdr:ChangeDetectorRef,private companyService:CompanyService){}

  ngOnInit(){
    this.companyService.getDataAdmin().subscribe((data:Company[])=>{
      this.companies = data;
      // this.selectedCompany = this.companies[0];
      console.log(this.companies)
    })
  }

  refreshSaveState(){
    this.saveEnabled =  this.data.firstName !== "" &&
      this.data.lastName !== "" &&
      this.data.address !== "" &&
      this.email !== "" &&
      this.selectedCompany != null &&
      this.data.role !== "";
  }

  onSaveButton(event:Event){
    this.data.contactData.push({key:"email", value:this.email})
    if(this.selectedCompany == null) return;
    this.data.company = this.selectedCompany?.name;
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
