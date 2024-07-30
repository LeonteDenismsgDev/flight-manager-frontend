import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightTemplateComponent } from './components/flight-template/flight-template.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';

const routes: Routes = [
  {
    path:'',
    component:FlightTemplateComponent
  },
  {
    path:'create',
    component:CreateTemplateComponent
  },{
    path:'update/:id',
    component:CreateTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightTemplateRoutingModule { }
