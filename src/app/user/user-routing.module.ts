import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GeneralComponent } from './components/settings/general/general.component';
import { SecurityComponent } from './components/settings/security/security.component';

const routes: Routes = [
  {
    path:'',
    component:UserPageComponent
  },
  {
    path:'details',
    component:UserDetailsComponent,
    children:[
      {
        path:'settings/general',
        component: GeneralComponent
      },
      {
        path:'settings/security',
        component: SecurityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
