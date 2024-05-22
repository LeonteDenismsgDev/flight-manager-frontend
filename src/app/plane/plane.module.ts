import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaneRoutingModule } from './plane-routing.module';
import { PlanePageComponent } from './components/plane-page/plane-page.component';


@NgModule({
  declarations: [PlanePageComponent],
  imports: [
    CommonModule,
    PlaneRoutingModule
  ]
})
export class PlaneModule { }
