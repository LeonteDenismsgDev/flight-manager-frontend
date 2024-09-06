import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaneRoutingModule } from './plane-routing.module';
import { PlanePageComponent } from './components/plane-page/plane-page.component';
import { UtilComponentsModule } from "../util-components/util-components.module";
import { ButtonModule } from 'primeng/button';
import { CreatePlaneComponent } from './components/create-plane/create-plane.component';
import { StepperModule} from 'primeng/stepper'
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { UpdatePlaneComponent } from './components/update-plane/update-plane.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxModule } from 'primeng/checkbox'
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [PlanePageComponent,CreatePlaneComponent, UpdatePlaneComponent],
  imports: [
    CommonModule,
    PlaneRoutingModule,
    UtilComponentsModule,
    ButtonModule,
    PanelModule,
    StepperModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    TabViewModule,
    DialogModule,
    MatIconModule,
    CheckboxModule,
    DynamicDialogModule,
    PaginatorModule
],
})
export class PlaneModule { }
