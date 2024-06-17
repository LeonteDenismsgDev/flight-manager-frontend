import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserDetailsComponent } from '../settings/components/user-details/user-details.component';
import { CardModule } from 'primeng/card';
import { PanelModule} from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { GeneralComponent } from '../settings/components/general/general.component';
import { SecurityComponent } from '../settings/components/security/security.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    UserPageComponent,
    UserDetailsComponent,
    GeneralComponent,
    SecurityComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    UserRoutingModule,
    PanelModule,
    MenuModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    DialogModule
  ]
})
export class UserModule { }
