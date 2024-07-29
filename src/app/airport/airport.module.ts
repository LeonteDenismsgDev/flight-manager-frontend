import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirportRoutingModule } from './airport-routing.module';
import { AirportPageComponent } from './components/airport-page/airport-page.component';
import { UtilComponentsModule } from "../util-components/util-components.module";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations:[AirportPageComponent],
  imports: [
    CommonModule,
    AirportRoutingModule,
    UtilComponentsModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    DropdownModule
]
})
export class AirportModule { }
