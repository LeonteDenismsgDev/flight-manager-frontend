import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { ItineraryPageComponent } from './components/itinerary-page/itinerary-page.component';


@NgModule({
  declarations: [
    ItineraryPageComponent
  ],
  imports: [
    CommonModule,
    ItineraryRoutingModule
  ]
})
export class ItineraryModule { }
