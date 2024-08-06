import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaneRoutingModule } from './plane-routing.module';
import { PlanePageComponent } from './components/plane-page/plane-page.component';
import { UtilComponentsModule } from "../util-components/util-components.module";
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CreatePlaneComponent } from './components/create-plane/create-plane.component';
import { StepperModule} from 'primeng/stepper'
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [PlanePageComponent, CreatePlaneComponent],
  imports: [
    CommonModule,
    PlaneRoutingModule,
    UtilComponentsModule,
    ButtonModule,
    FormsModule,
    PanelModule,
    StepperModule
]
})
export class PlaneModule { }
