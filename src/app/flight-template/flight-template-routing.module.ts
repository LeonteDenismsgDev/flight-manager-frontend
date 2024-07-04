import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTemplateComponent } from './components/flight-template/flight-template.component';

const routes: Routes = [
  {
    path:'',
    component:FlightTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightTemplateRoutingModule { }
