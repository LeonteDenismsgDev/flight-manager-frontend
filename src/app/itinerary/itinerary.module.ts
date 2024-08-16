import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { ItineraryPageComponent } from './components/itinerary-page/itinerary-page.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItineraryPageComponent
  ],
  imports: [
    CommonModule,
    ItineraryRoutingModule,
    CalendarModule,
    FormsModule
  ]
})
export class ItineraryModule { }
