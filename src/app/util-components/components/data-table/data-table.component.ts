import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() viewData: any[] = [];
  @Input() headers: string[] = [];
  @Input() keys: string[]=[];
  selectedData!: any;

  getFieldValue(item: any, key: string): any{
    if(key === "email"){
        return item["contactData"].email
    }else{
      return item[key]
    }
  }
  onRowSelected(evenet : any){
    //to do redirect to users page
  }
}
