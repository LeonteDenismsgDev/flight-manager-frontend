import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Itinerary } from '../../models/itinerary';
import { Time } from '../../models/time';
import { CompanyService } from 'src/app/company/services/company.service';
import { Company } from 'src/app/company/models/company';

@Component({
  selector: 'app-view-itinerary',
  templateUrl: './view-itinerary.component.html',
  styleUrl: './view-itinerary.component.scss'
})
export class ViewItineraryComponent {

  selectedItinerary?:Itinerary;
  expectedDepartureTime:string="";
  expectedArrivalTime:string="";

  actualDepartureTime:string = "";
  actualArrivalTime:string = "";

  company?:Company;

  calculateActualDate(date:Time|undefined,offsetMinutes:number|undefined){
    if(date == undefined || offsetMinutes == undefined) return;
    date.minute += offsetMinutes;
    if(date.minute > 60){
      let offsetHours = Math.floor(date.minute/60);
      date.minute = date.minute%60;
      date.hour += offsetHours;
      if(date.hour > 24){
        let offsetDays = Math.floor(date.hour/24);
        date.hour = date.hour%24;
        let _d:Date = new Date();
        _d.setFullYear(date.year);
        _d.setMonth(date.month-1);
        _d.setDate(date.day);
        _d.setDate(_d.getDate() + offsetDays);
        date.day = _d.getDate();
        date.month = _d.getMonth() + 1;
        date.year = _d.getFullYear();
      }
    }
    return date;
  }

  formatDate(date:Time|undefined){
    if(date == undefined) return "";
    return date.day + "/"
          + date.month + "/" 
          + date.day + "  " 
          + date.hour + ":"
          + date.minute;
  }

  constructor(private ref:DynamicDialogRef,private config:DynamicDialogConfig, private companyService:CompanyService){
    this.selectedItinerary = this.config.data["itinerary"];
    this.expectedDepartureTime = this.formatDate(this.selectedItinerary?.departureTime);
    this.expectedArrivalTime = this.formatDate(this.selectedItinerary?.arrivalTime);
    let _depTime=this.calculateActualDate(this.selectedItinerary?.departureTime,this.selectedItinerary?.lateDepartureMinutes);
    let _arrTime=this.calculateActualDate(this.selectedItinerary?.arrivalTime,this.selectedItinerary?.lateArrivalMinutes);
    this.actualArrivalTime = this.formatDate(_arrTime);
    this.actualDepartureTime = this.formatDate(_depTime);
    this.companyService.getDataCurrent().subscribe((data:Company)=>{
      this.company = data;
    })
  }
}
