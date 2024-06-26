import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportPageComponent } from './components/airport-page/airport-page.component';

const routes: Routes = [
  {
    path:'',
    component:AirportPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirportRoutingModule { }
