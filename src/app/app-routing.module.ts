import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './util/guards/auth.guard';

const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('../app/home/home.module').then(m=>m.HomeModule),
    canActivate:[authGuard]
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
  //Enable tracing for router outlet output on console
  imports: [RouterModule.forRoot(routes, {enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
