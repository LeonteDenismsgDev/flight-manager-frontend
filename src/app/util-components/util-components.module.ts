import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    TableModule
  ],
  exports:[DataTableComponent]
})
export class UtilComponentsModule { }
