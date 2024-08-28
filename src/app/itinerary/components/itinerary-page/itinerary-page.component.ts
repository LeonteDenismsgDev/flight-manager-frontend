import { Component, OnInit, ViewChild } from '@angular/core';
import { Itinerary } from '../../models/itinerary';
import { ItineraryService } from '../../services/itinerary.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Plane } from 'src/app/plane/models/Plane';
import { PlaneService } from 'src/app/plane/services/plane.service';
import { DataTableComponent } from 'src/app/util-components/components/data-table/data-table.component';
import { ViewItineraryComponent } from '../view-itinerary/view-itinerary.component';

@Component({
  selector: 'app-itinerary-page',
  templateUrl: './itinerary-page.component.html',
  styleUrl: './itinerary-page.component.scss'
})
export class ItineraryPageComponent implements OnInit{
  
  @ViewChild('itineraryTable') tableChild!:DataTableComponent;
  headers=["Departure","Arrival","Departure Time", "Arrival Time", "Flight Number"];
  keys=["departure","arrival","departureTimeFormatted","arrivalTimeFormatted","flightNumber"];
  data:Itinerary[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(private service:ItineraryService, private dialogService:DialogService){}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.service.getAll().subscribe((data:Itinerary[])=>{
      data.forEach((_it:Itinerary)=>{
        _it.departureTimeFormatted = _it.departureTime.day + "/" + _it.departureTime.month + "/" + _it.departureTime.year + "  " + _it.departureTime.hour + ":" + _it.departureTime.minute;
        if(_it.lateDepartureMinutes > 0){
          _it.departureTimeFormatted += "  +" + _it.lateDepartureMinutes.toString() + " minutes late"
        }
        _it.arrivalTimeFormatted = _it.arrivalTime.day + "/" + _it.arrivalTime.month + "/" + _it.arrivalTime.year + "  " + _it.arrivalTime.hour + ":" + _it.arrivalTime.minute;
        if(_it.lateArrivalMinutes > 0){
          _it.arrivalTimeFormatted += "  +" + _it.lateArrivalMinutes.toString() + " minutes late"
        }
      })
      this.data = data;
      this.show(this.data[0])
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
}