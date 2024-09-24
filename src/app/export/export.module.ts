import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './components/export/export.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserExportComponent } from './components/user-export/user-export.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CompanyExportComponent } from './components/company-export/company-export.component';
import { PlaneExportComponent } from './components/plane-export/plane-export.component';

@NgModule({
  declarations: [
    ExportComponent,
    UserExportComponent,
    CompanyExportComponent,
    PlaneExportComponent
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    DropdownModule,
    FormsModule,
    FloatLabelModule,
    RadioButtonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
  ]
})
export class ExportModule { }
