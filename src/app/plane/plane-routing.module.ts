import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaneModule } from './plane.module';
import { PlanePageComponent } from './components/plane-page/plane-page.component';
import { createMayBeForwardRefExpression } from '@angular/compiler';
import { CreatePlaneComponent } from './components/create-plane/create-plane.component';

const routes: Routes = [
  {
    path:'',
    component:PlanePageComponent,
  },
  {
    path:'create',
    component:CreatePlaneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaneRoutingModule { }
