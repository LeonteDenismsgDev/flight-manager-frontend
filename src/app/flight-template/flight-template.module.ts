import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightTemplateRoutingModule } from './flight-template-routing.module';
import { FlightTemplateComponent } from './components/flight-template/flight-template.component';
import { UtilComponentsModule } from '../util-components/util-components.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { ValidationRuleComponent } from './components/validation-rule/validation-rule.component';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    FlightTemplateComponent,
    CreateTemplateComponent,
    ValidationRuleComponent
  ],
  imports: [
    CalendarModule,
    CommonModule,
    FlightTemplateRoutingModule,
    UtilComponentsModule,
    DropdownModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
    PaginatorModule,
    DragDropModule,
    PanelModule,
    TagModule
  ]
})
export class FlightTemplateModule { }
