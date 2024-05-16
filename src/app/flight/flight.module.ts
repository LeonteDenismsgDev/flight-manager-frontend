import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightPageComponent } from './components/flight-page/flight-page.component';


@NgModule({
  declarations: [FlightPageComponent],
  imports: [
    CommonModule,
    FlightRoutingModule
  ]
})
export class FlightModule { }
