import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomCompanyExportRequest } from '../../models/custom-company-export-request';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-company-export',
  templateUrl: './company-export.component.html',
  styleUrl: './company-export.component.scss'
})
export class CompanyExportComponent implements OnInit{
  @Output() trigger = new EventEmitter<any>();

  selMinCrew:number = 0;
  selMaxCrew:number = 0;
  selMinFleet:number = 0;
  selMaxFleet:number = 0;

  atLeastOneCriteriaSelected:boolean = false;

  maxCrew:number = 20;
  maxFleet!:number;

  constructor(private companyService:CompanyService){}

  ngOnInit(): void {
      this.companyService.getMaxCompanies().subscribe(data=>{
        this.maxFleet = data;
        this.selMaxCrew = this.maxCrew;
        this.selMaxFleet = this.maxFleet;
      })
  }

  changeSelection(){
    if(this.selMinCrew == undefined && this.selMaxCrew == undefined && this.selMinFleet == undefined && this.selMaxFleet == undefined) {
      this.trigger.emit(null);
      this.atLeastOneCriteriaSelected=false;
      return;
    }
    else{
      this.atLeastOneCriteriaSelected=true;
    }
    if(this.selMinCrew == 0 && this.selMaxCrew == this.maxCrew && this.selMinFleet == 0 && this.selMaxFleet == this.maxFleet) {
      this.trigger.emit(null);
      this.atLeastOneCriteriaSelected=false;
      return;
    }
    else{
      this.atLeastOneCriteriaSelected=true;
    }
    if(this.selMinCrew == undefined) {
      this.selMinCrew = 0;
    }
    if(this.selMaxCrew == undefined) this.selMaxCrew = this.maxCrew;

    if(this.selMinFleet == undefined) this.selMinFleet = 0;
    if(this.selMaxFleet == undefined && this.maxFleet!=undefined) this.selMaxFleet = this.maxFleet;
    if(this.selMinCrew >= this.selMaxCrew){
      this.trigger.emit(null);
      this.atLeastOneCriteriaSelected=false;
      return;
    }
    if(this.selMinFleet >= this.selMaxFleet){
      this.trigger.emit(null);
      this.atLeastOneCriteriaSelected=false;
      return;
    }
    if(this.atLeastOneCriteriaSelected)
      this.trigger.emit(new CustomCompanyExportRequest(this.selMinFleet,this.selMaxFleet,this.selMinCrew,this.selMaxCrew));
    else
      this.trigger.emit(null);
  }
}
