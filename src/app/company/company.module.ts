import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [CompanyPageComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    CardModule,
    FormsModule,
    ScrollPanelModule,
    ButtonModule,
    DialogModule
  ]
})
export class CompanyModule { }
