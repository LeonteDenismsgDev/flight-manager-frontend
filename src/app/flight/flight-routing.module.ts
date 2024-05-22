import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightPageComponent } from './components/flight-page/flight-page.component';

const routes: Routes = [
  {
    path:'',
    component:FlightPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
