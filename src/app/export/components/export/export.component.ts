import { Component } from '@angular/core';
import { CustomUserExportRequest } from '../../models/custom-user-export-request';
import { CustomCompanyExportRequest } from '../../models/custom-company-export-request';
import { CustomPlaneExportRequest } from '../../models/custom-plane-export-request';
import { ExportRequest } from '../../models/export-request';
import { FilterExportRequest } from '../../models/filter-export-request';
import { ExportService } from '../../services/export.service';
import { MessageService } from 'primeng/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss'
})
export class ExportComponent {
  typeList=["Users","Planes","Airports","Flights","Companies","Templates"]
  selectedType:string = "Users";
  selectionType:string = "";
  exportable:boolean = false;
  maxElements:number = 0;
  selectedMin?:number;
  selectedMax?:number;
  averageSelection?:number;

  filterRequestData!: CustomUserExportRequest|CustomCompanyExportRequest|CustomPlaneExportRequest|null;

  validRange:boolean = false;
  validFilter:boolean = false;
  validAll:boolean = false;

  constructor(private service:ExportService,private msg:MessageService){}

  checkExportable(){
    this.exportable = this.selectedType!="" &&
      this.selectionType != "" &&
      (this.validAll || this.validFilter || this.validRange);
  }

  changeAverage(){
    if(this.selectedMin!=null && this.selectedMax != null && this.selectedMax >= this.selectedMin){
      this.averageSelection = this.selectedMax-this.selectedMin+1;
      this.validRange = true;
      this.validAll = false;
      this.validFilter = false;
    }
    else{
    this.validRange = false;
    }
  }

  changeFilterSelection(request:null|CustomUserExportRequest|CustomCompanyExportRequest|CustomPlaneExportRequest ){
    if(this.selectionType == "Filter"){
      this.filterRequestData = request;
      this.validFilter = request != null;
      this.validAll = false;
      this.validRange = false;
    }
    else
    {
      this.validFilter = false;
      this.filterRequestData = null;
    }
    console.log(this.filterRequestData);
    this.changeAllSelection();
  }

  changeFilterSelector(){
    if(this.selectionType != "Ranged"){
      this.selectedMax = undefined;
      this.selectedMin = undefined;
      this.averageSelection = undefined;
    }
    this.changeAllSelection();
  }

  changeAllSelection(){
    if(this.selectionType == "All") {
      this.validAll = true;
      this.validFilter = false;
      this.validRange = false;
    }
    else this.validAll = false;
    this.changeAverage();
    this.checkExportable();
  }

  changeDataType(){
    this.validAll = false;
    this.validFilter = false;
    this.validRange = false;
    this.selectedMax = undefined;
    this.selectedMin = undefined;
    this.averageSelection = undefined;
    this.exportable = false;
    this.maxElements = 0;
    if(this.selectedType == "Airports"){
      this.selectionType = "Ranged";
    }
  }

  send(){
    let request = new ExportRequest(this.selectedType,this.selectionType);
    if(this.selectionType == "Ranged" && this.selectedMin != undefined && this.selectedMax != undefined && this.selectedMax > this.selectedMin){
      request.request=new FilterExportRequest(this.selectedMin,this.selectedMax);
    }
    else if(this.selectionType == "Filter" && this.filterRequestData != null){
      request.request=this.filterRequestData;
    }
    else if(this.selectionType == "All"){
      //do nothing
    }
    else{
      return;
    }
    // console.log(request);
    this.service.sendRequest(request).subscribe((data:Blob)=>{
      console.log(data);
      saveAs(data,"export.csv");
    });
  }
}
