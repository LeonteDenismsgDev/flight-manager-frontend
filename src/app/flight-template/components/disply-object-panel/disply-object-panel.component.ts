import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-disply-object-panel',
  templateUrl: './disply-object-panel.component.html',
  styleUrls: ['./disply-object-panel.component.css']
})
export class DisplyObjectPanelComponent{
  @Input()
  objectAttributes : { [key: string]: any } = {};
  @Input()
  diplsyButtons : boolean = false
  @Output() childDataChange = new EventEmitter<string>();
  @Output() changeAttribute = new EventEmitter<string>();

  removeAttribute(attribute: string){
    this.childDataChange.emit(attribute)
  }

  editAttribute(attribute: string){
    this.changeAttribute.emit(attribute)
  }

  getObjectAttributes(obj: object){
    return Object.keys(obj)
   }
   
   getObjectType(attr_name : string){
   return this.objectAttributes[attr_name]["type"]
   }
   
   getObjectDate(attr_name : string){
     let date  = this.objectAttributes[attr_name]["value"]["date"] as Date
     let time = this.objectAttributes[attr_name]["value"]["time"] as Date
     const hours = time.getHours();
     const minutes = time.getMinutes();
     const seconds = time.getSeconds()
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   }

   getObjectValue(attr_name: string){
    return this.objectAttributes[attr_name]["value"]
   }

   getArrayType(attr_name: string) : string{
    return this.objectAttributes[attr_name]["value"]["of"]
   }

   getArrayList(attr_name: string){
    return this.objectAttributes[attr_name]["value"]["values"]
   }
}
