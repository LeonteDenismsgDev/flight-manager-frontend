import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItineraryRoutingModule } from './itinerary-routing.module';
import { ItineraryPageComponent } from './components/itinerary-page/itinerary-page.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UtilComponentsModule } from "../util-components/util-components.module";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel'
import { DropdownModule } from 'primeng/dropdown';
import { ViewItineraryComponent } from './components/view-itinerary/view-itinerary.component';

@NgModule({
  declarations: [
    ItineraryPageComponent,
    ViewItineraryComponent,
  ],
  imports: [
    CommonModule,
    ItineraryRoutingModule,
    CalendarModule,
    FormsModule,
    MatIconModule,
    UtilComponentsModule,
    DynamicDialogModule,
    DividerModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule
],
providers:[
  DialogService
]
})
export class ItineraryModule { }
