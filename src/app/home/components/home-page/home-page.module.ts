import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { RouterModule, Routes } from "@angular/router";
import { AirportPageComponent } from "../../../airport/components/airport-page/airport-page.component";
import { CompanyPageComponent } from "../../../company/components/company-page/company-page.component";
import { EmployeePageComponent } from "../../../employee/components/employee-page/employee-page.component";
import { FlightPageComponent } from "../../../flight/components/flight-page/flight-page.component";
import { ItineraryPageComponent } from "../../../itinerary/components/itinerary-page/itinerary-page.component";
import { PlanePageComponent } from "../../../plane/components/plane-page/plane-page.component";
import { UserPageComponent } from "../../../user/components/user-page/user-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../../../app-routing.module";

const appRoutes: Routes = [
    {path: 'users',component:UserPageComponent},
    {path: 'flights',component:FlightPageComponent},
    {path: 'planes',component:PlanePageComponent},
    {path: 'airports',component:AirportPageComponent},
    {path: 'itineraries',component:ItineraryPageComponent},
    {path: 'employees',component:EmployeePageComponent},
    {path:'companies',component:CompanyPageComponent}
  ];

@NgModule({
    declarations:[
        UserPageComponent,
        FlightPageComponent,
        PlanePageComponent,
        AirportPageComponent,
        ItineraryPageComponent,
        EmployeePageComponent,
        CompanyPageComponent,
        HomePageComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes, {enableTracing:true})
    ],
    providers: [],
    bootstrap: [HomePageComponent]
})
export class HomePageModule{}