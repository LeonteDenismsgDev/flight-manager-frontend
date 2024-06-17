import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from '../user/components/user-page/user-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GeneralComponent } from './components/general/general.component';
import { SecurityComponent } from './components/security/security.component';

const routes: Routes = [
  {
    path:'',
    component:UserDetailsComponent,
    children:[
      {
        path:'general',
        component: GeneralComponent
      },
      {
        path:'security',
        component: SecurityComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
