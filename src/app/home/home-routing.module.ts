import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent,
    children:[
      {
        path:'',
        redirectTo:'landing',
        pathMatch:'full'
      },
      {
        path:'landing',
        loadChildren:()=>import('./../landing/landing.module').then(m=>m.LandingModule)
      },
      {
        path:'users',
        loadChildren:()=>import('./../user/user.module').then(m=>m.UserModule)
      },
      {
        path:'flights',
        loadChildren:()=>import('./../flight/flight.module').then(m=>m.FlightModule)
      },
      {
        path:'planes',
        loadChildren:()=>import('./../plane/plane.module').then(m=>m.PlaneModule)
      },
      {
        path:'airports',
        loadChildren:()=>import('./../airport/airport.module').then(m=>m.AirportModule)
      },
      {
        path:'itineraries',
        loadChildren:()=>import('./../itinerary/itinerary.module').then(m=>m.ItineraryModule)
      },
      {
        path:'employees',
        loadChildren:()=>import('./../employee/employee.module').then(m=>m.EmployeeModule)
      },
      {
        path:'companies',
        loadChildren:()=>import('./../company/company.module').then(m=>m.CompanyModule)
      }
    ]
  }
  //TODO: add login path here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
