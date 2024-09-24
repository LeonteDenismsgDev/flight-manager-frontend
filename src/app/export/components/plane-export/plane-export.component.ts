import { Component, EventEmitter, Output } from '@angular/core';
import { CustomPlaneExportRequest } from '../../models/custom-plane-export-request';
import { Company } from 'src/app/company/models/company';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-plane-export',
  templateUrl: './plane-export.component.html',
  styleUrl: './plane-export.component.scss'
})
export class PlaneExportComponent {
  @Output() trigger = new EventEmitter<any>();

  selectedManufacturer:string = "";
  selectedModel:string="";
  selectedMinYear:number=1900;
  selectedMaxYear:number=2100;
  selectedCompany:string="";
  companyList:string[]=[];

  constructor(private companyService:CompanyService){}

  ngOnInit(): void {
      this.companyService.getDataAdmin().subscribe((data:Company[])=>{
        data.forEach((c:Company)=>{this.companyList.push(c.name) })
      })
  }
  sendSelection(){
    if((this.selectedManufacturer == undefined || this.selectedManufacturer == "") &&
        (this.selectedMinYear == undefined || this.selectedMinYear == 1900) &&
        (this.selectedMaxYear == undefined || this.selectedMaxYear == 2100) &&
        (this.selectedCompany == undefined || this.selectedCompany == "")  &&
        (this.selectedModel == undefined || this.selectedModel == "")){
      this.trigger.emit(null);
      return;
    }
    if(this.selectedMinYear > this.selectedMaxYear){
      this.trigger.emit(null);
      return;
    }
    this.trigger.emit(new CustomPlaneExportRequest(this.selectedManufacturer,this.selectedModel,this.selectedMinYear,this.selectedMaxYear,this.selectedCompany));
  }
}
