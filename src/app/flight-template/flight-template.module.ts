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
import { ValidationPanelComponent } from './components/validation-panel/validation-panel.component';
import { AttributePanelComponent } from './components/attribute-panel/attribute-panel.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AttributePanelDefaultComponent } from './components/attribute-panel-default/attribute-panel-default.component';
import { DisplyObjectPanelComponent } from './components/disply-object-panel/disply-object-panel.component';
import { DisplayArrayPanelComponent } from './components/display-array-panel/display-array-panel.component';


@NgModule({
  declarations: [
    FlightTemplateComponent,
    CreateTemplateComponent,
    ValidationRuleComponent,
    ValidationPanelComponent,
    AttributePanelComponent,
    AttributePanelDefaultComponent,
    DisplyObjectPanelComponent,
    DisplayArrayPanelComponent
  ],
  imports: [
    CheckboxModule,
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
