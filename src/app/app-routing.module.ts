import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('../app/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'login',
    loadChildren:()=>import('../app/security/security.module').then(m=>m.SecurityModule)
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
