import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanePageComponent } from './components/plane-page/plane-page.component';
import { CreatePlaneComponent } from './components/create-plane/create-plane.component';
import { Role } from '../user/models/role';
import { masterGuard } from '../util/guards/master.guard';
import { UpdatePlaneComponent } from './components/update-plane/update-plane.component';

const routes: Routes = [
  {
    path:'',
    component:PlanePageComponent,
  },
  {
    path:'createAdmin',
    component:CreatePlaneComponent,
    canActivate:[masterGuard],
    data:{activeGuards:[Role.ad]}
  },
  {
    path:'updateTemp',
    component:UpdatePlaneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaneRoutingModule { }
