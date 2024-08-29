import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SecurityModule } from './../security/security.module';
import { masterGuard } from '../util/guards/master.guard';
import { Role } from '../user/models/role';

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
        loadChildren:()=>import('./../landing/landing.module').then(m=>m.LandingModule),
      },
      {
        path:'users',
        loadChildren:()=>import('./../user/user.module').then(m=>m.UserModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad]}
      },
      {
        path:'flights',
        loadChildren:()=>import('./../flight/flight.module').then(m=>m.FlightModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad, Role.fm]}
      },
      {
        path:'planes',
        loadChildren:()=>import('./../plane/plane.module').then(m=>m.PlaneModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad,Role.cm]}
      },
      {
        path:'airports',
        loadChildren:()=>import('./../airport/airport.module').then(m=>m.AirportModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad,Role.cm]}
      },
      {
        path:'itineraries',
        loadChildren:()=>import('./../itinerary/itinerary.module').then(m=>m.ItineraryModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.cr]}
      },
      {
        path:'employees',
        loadChildren:()=>import('./../employee/employee.module').then(m=>m.EmployeeModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad,Role.cm]}
      },
      {
        path:'companies',
        loadChildren:()=>import('./../company/company.module').then(m=>m.CompanyModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad]}
      },
      {
        path:'company',
        loadChildren:()=>import('./../company/company.module').then(m=>m.CompanyModule),
        canActivate:[masterGuard],
        data:{activeGuards:[Role.ad,Role.cm,Role.fm,Role.cr]}
      },
      {
        path:'settings',
        loadChildren:()=>import('./../settings/settings.module').then(m=>m.SettingsModule),
      }
    ]
  },
  {
    path:'login',
    loadChildren:()=>import('./../security/security.module').then(m=>SecurityModule)
  }
  //TODO: add login path here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
