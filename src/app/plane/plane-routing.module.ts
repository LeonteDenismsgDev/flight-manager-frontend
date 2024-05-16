import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaneModule } from './plane.module';
import { PlanePageComponent } from './components/plane-page/plane-page.component';

const routes: Routes = [
  {
    path:'',
    component:PlanePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaneRoutingModule { }
