import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItineraryPageComponent } from './components/itinerary-page/itinerary-page.component';

const routes: Routes = [
  {
    path:'',
    component:ItineraryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItineraryRoutingModule { }
