import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ButtonModule } from 'primeng/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TabMenuModule,
    ButtonModule,
    MatIconModule,
  ]
})
export class HomeModule { }
