import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlightTemplateService } from '../../services/flight-template.service';
import { FlightTemplateTableResponse } from '../../models/FlightTemplateTableResponse';
import { FlightTemplate } from '../../models/FlightTemplate';

@Component({
  selector: 'app-flight-template',
  templateUrl: './flight-template.component.html',
  styleUrls: ['./flight-template.component.css']
})
export class FlightTemplateComponent implements OnInit{
  flightTemplateList:FlightTemplate[]=[];
  columns=["Origin","Destination","Departure Time", "Arrival Time", "Plane"]
  keys=["origin","destination",'departureTime',"arrivalTime","plane"]

  page:number = 0;
  size:number = 10;
  max_page:number = 0;

  size_options=[
    {label: 10, value: 10},
    {label: 20, value: 20},
    {label: 50, value: 50}
  ]

  constructor(private flightTemplateService:FlightTemplateService, private cdr:ChangeDetectorRef){}

  ngOnInit(){
    //refreshTable();
  }

  refreshTable(){
    this.flightTemplateService.getTableData(this.page,this.size).subscribe(
      (result:FlightTemplateTableResponse)=>{
        this.max_page = Math.ceil(result.templatesCount/this.size);
        this.flightTemplateList = result.page;
      });
  }

  removePage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.refreshTable()
  }

  addPage(){
    if(this.page >= this.max_page) return;
    this.page+=1;
    this.refreshTable();
  }
}
