import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomUserExportRequest } from '../../models/custom-user-export-request';
import { CompanyService } from 'src/app/company/services/company.service';
import { Company } from 'src/app/company/models/company';

@Component({
  selector: 'app-user-export',
  templateUrl: './user-export.component.html',
  styleUrl: './user-export.component.scss'
})
export class UserExportComponent implements OnInit{

  @Output() trigger = new EventEmitter<any>();

  selectedCompany?:Company;
  selectedRole:string[]=[];
  roleList=["ADMINISTRATOR_ROLE","COMPANY_MANAGER_ROLE","FLIGHT_MANAGER_ROLE","CREW_ROLE"];
  companyList:Company[]=[];

  constructor(private companyService:CompanyService){}

  ngOnInit(): void {
      this.companyService.getDataAdmin().subscribe((data:Company[])=>{
        this.companyList = data;
      })
  }

  changeSelection(){
    if((this.selectedCompany == undefined || this.selectedCompany.name == "") && (this.selectedRole.length == 0)) {
      this.trigger.emit(null);
      return;
    }
    if(this.selectedCompany != null)
    this.trigger.emit(new CustomUserExportRequest(this.selectedCompany.name,this.selectedRole));
  }

}
