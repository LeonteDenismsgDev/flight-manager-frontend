import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MyCompanyComponent } from './components/my-company/my-company.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [CompanyPageComponent, MyCompanyComponent, ManageCompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CardModule,
    FormsModule,
    ScrollPanelModule,
    ButtonModule,
    DialogModule,
    PanelModule,
    InputSwitchModule
  ]
})
export class CompanyModule { }
