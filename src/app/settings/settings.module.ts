import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { StandaloneSettingsComponent } from './components/standalone-settings/standalone-settings.component';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    StandaloneSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PanelModule,
    MenuModule,
    InputTextModule,
    FormsModule,
    InputSwitchModule,
    ButtonModule,
    DialogModule,
    DropdownModule
  ],
  exports:[
    StandaloneSettingsComponent
  ]
})
export class SettingsModule { }
