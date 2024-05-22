import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirportRoutingModule } from './airport-routing.module';
import { AirportPageComponent } from './components/airport-page/airport-page.component';


@NgModule({
  declarations:[AirportPageComponent],
  imports: [
    CommonModule,
    AirportRoutingModule
  ]
})
export class AirportModule { }
