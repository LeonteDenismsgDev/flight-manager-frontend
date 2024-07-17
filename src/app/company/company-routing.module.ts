import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { MyCompanyComponent } from './components/my-company/my-company.component';
import { masterGuard } from '../util/guards/master.guard';
import { Role } from '../user/models/role';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';

const routes: Routes = [
  {
    path:'admin',
    component:CompanyPageComponent,
    canActivate:[masterGuard],
    data:{activeGuards:[Role.ad]}
  },
  {
    path:'mycompany',
    component:MyCompanyComponent,
    canActivate:[masterGuard],
    data:{activeGuards:[Role.cr,Role.fm]}
  },
  {
    path:'manage',
    component:ManageCompanyComponent,
    canActivate:[masterGuard],
    data:{activeGuards:[Role.cm]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
