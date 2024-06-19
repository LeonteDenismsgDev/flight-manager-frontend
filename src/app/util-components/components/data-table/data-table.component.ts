import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() viewData: any[] = [];
  @Input() columns: string[] = [];
  selectedData!: any;

  getFieldValue(item: any, column: string): any{
    return item[column]
  }
  onRowSelected(evenet : any){
    //to do redirect to users page
  }
}
