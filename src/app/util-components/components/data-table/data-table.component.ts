import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() viewData: any[] = [];
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() toggleable: boolean = false;
  @Output() onRowClick= new EventEmitter<any>();

  selectedData!: any;
  constructor(private cdr:ChangeDetectorRef){}

  getFieldValue(item: any, key: string): any{
    if(key === "email"){
        return item["contactData"].email
    }else{
      return item[key]
    }
  }

  callback(){
    this.onRowClick.emit(this.selectedData);
    if(!this.toggleable){
      this.selectedData = {};
      this.cdr.markForCheck();
    }
  }

}
