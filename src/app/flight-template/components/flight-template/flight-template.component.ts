import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlightTemplateService } from '../../services/flight-template.service';
import { FlightTemplateTableResponse } from '../../models/FlightTemplateTableResponse';
import { FlightTemplate } from '../../models/FlightTemplate';
import { REQUIRED_ATTRIBUTES } from '../../models/RequiredAttributes';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-flight-template',
  templateUrl: './flight-template.component.html',
  styleUrls: ['./flight-template.component.css']
})
export class FlightTemplateComponent implements OnInit{
  flightTemplateList:FlightTemplate[]=[];
  mondatory_attributes=REQUIRED_ATTRIBUTES;

  page:number = 0;
  size:number = 4;
  max_page:number = 0;

  constructor(private flightTemplateService:FlightTemplateService){}

  ngOnInit(){
    this.refreshTable();
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

  addPage(event : PageEvent) {
    if(this.page >= this.max_page) return;
    this.page+=1;
    this.refreshTable();
  }
}
