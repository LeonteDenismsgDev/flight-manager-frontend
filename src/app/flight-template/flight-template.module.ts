import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightTemplateRoutingModule } from './flight-template-routing.module';
import { FlightTemplateComponent } from './components/flight-template/flight-template.component';
import { UtilComponentsModule } from '../util-components/util-components.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlightTemplateComponent
  ],
  imports: [
    CommonModule,
    FlightTemplateRoutingModule,
    UtilComponentsModule,
    DropdownModule,
    FormsModule
  ]
})
export class FlightTemplateModule { }
