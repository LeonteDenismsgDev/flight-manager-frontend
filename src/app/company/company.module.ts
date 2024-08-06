import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MyCompanyComponent } from './components/my-company/my-company.component';
import { CheckboxModule} from 'primeng/checkbox'


@NgModule({
  declarations: [CompanyPageComponent, ManageCompanyComponent, MyCompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CardModule,
    FormsModule,
    ScrollPanelModule,
    ButtonModule,
    DialogModule,
    PanelModule,
    InputSwitchModule,
    CheckboxModule
  ]
})
export class CompanyModule { }
