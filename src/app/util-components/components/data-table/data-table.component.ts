import { ApplicationRef, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() height: string = "50vh";
  @Output() onRowClick= new EventEmitter<any>();

  selectedData!: any;
  constructor(private appRef:ApplicationRef){}

  getFieldValue(item: any, key: string): any{
    if(key === "email"){
        return item["contactData"].email
    }
    return item[key]
  }

  autoDeselect(){
    this.selectedData = null;
    this.appRef.tick();
  }
  
  callback(event:any){
    if(event.data == null) return;
    this.onRowClick.emit(event.data);
  }

}
