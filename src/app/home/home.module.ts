import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ButtonModule } from 'primeng/button';
import {MatIconModule} from '@angular/material/icon';
import { DialogModule} from 'primeng/dialog';
import { UserModule } from '../user/user.module';
import { WebSocketService } from '../util-components/services/websocket.service';
import { rxStompServiceFactory } from '../util-components/services/rx-stomp-service-factory';
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
    DialogModule,
    UserModule
  ],
  providers:[
    {
      provide:WebSocketService,
      useFactory: rxStompServiceFactory
    }
  ]
})
export class HomeModule { }
