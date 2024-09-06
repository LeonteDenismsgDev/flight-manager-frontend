import { Component, OnInit, ViewChild } from '@angular/core';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Plane } from 'src/app/plane/models/Plane';
import { PlaneService } from 'src/app/plane/services/plane.service';
import { DataTableComponent } from 'src/app/util-components/components/data-table/data-table.component';
import { ViewItineraryComponent } from '../view-itinerary/view-itinerary.component';
import { ItineraryResponse } from '../../models/ItineraryResponse';
import { GetItinerary } from '../../models/GetItinerary';

@Component({
  selector: 'app-itinerary-page',
  templateUrl: './itinerary-page.component.html',
  styleUrl: './itinerary-page.component.scss'
})
export class ItineraryPageComponent implements OnInit{
  
  @ViewChild('itineraryTable') tableChild!:DataTableComponent;
  headers=[ "Flight Number","Departure","Arrival","Departure Time", "Arrival Time",];
  keys=["flightNumber", "departure","arrival","departureTimeFormatted","arrivalTimeFormatted",];
  data:Itinerary[] = [];

  page:number=0;
  size:number = 10;
  max_page:number = 0;
  max_itineraries:number = 0;
  size_options=[10,20,30];
  filter:string = "";

  ref: DynamicDialogRef | undefined;

  constructor(private service:ItineraryService, private dialogService:DialogService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    let request:GetItinerary = new GetItinerary(this.page,this.size,this.filter);
    this.service.getFiltered(request).subscribe((data:ItineraryResponse)=>{
      data.page.forEach((_it:Itinerary)=>{
        _it.departureTimeFormatted = _it.departureTime.day + "/" + _it.departureTime.month + "/" + _it.departureTime.year + "  " + _it.departureTime.hour + ":" + _it.departureTime.minute;
        if(_it.lateDepartureMinutes > 0){
          _it.departureTimeFormatted += "  +" + _it.lateDepartureMinutes.toString() + " minutes late"
        }
        _it.arrivalTimeFormatted = _it.arrivalTime.day + "/" + _it.arrivalTime.month + "/" + _it.arrivalTime.year + "  " + _it.arrivalTime.hour + ":" + _it.arrivalTime.minute;
        if(_it.lateArrivalMinutes > 0){
          _it.arrivalTimeFormatted += "  +" + _it.lateArrivalMinutes.toString() + " minutes late"
        }
      })
      this.data = data.page;
      this.max_itineraries = data.max_itineraries;
      this.max_page = Math.ceil(data.max_itineraries/((this.page+1)*this.size))
      if(data.max_itineraries <= this.size) this.max_page = 0;
    })
  }

  show(itineraryData:Itinerary){
    this.ref = this.dialogService.open(ViewItineraryComponent,{
      header:itineraryData.flightNumber,
      data:{
        'itinerary':itineraryData
      }
    });
    this.ref.onClose.subscribe(()=>{
      this.tableChild.autoDeselect();
    })
  }

  removePage(){
    if(this.page == 0) return;
    this.page--;
    this.refresh();
  }

  addPage(){
    if(this.page >= this.max_page) return;
    this.page++;
    this.refresh();
  }

  changePaginator(){
    this.page = 0;
    this.refresh();
  }
}