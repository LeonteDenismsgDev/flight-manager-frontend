import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePageComponent } from './components/employee-page/employee-page.component';
import { UtilComponentsModule } from "../util-components/util-components.module";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    UtilComponentsModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule
]
})
export class EmployeeModule { }
