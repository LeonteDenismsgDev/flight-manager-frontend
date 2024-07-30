import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';
import { VALIDATION_RULES } from '../../models/ValidationRules';
import { OBJECTS_VALIDATION_ATTRIBUTES } from '../../models/ObjectValidationAttributes';

@Component({
  selector: 'app-validation-panel',
  templateUrl: './validation-panel.component.html',
  styleUrls: ['./validation-panel.component.css']
})
export class ValidationPanelComponent{
@Input()
selectedAttribute : ViewAttributes | null = null
@Input()
selectedAttributes : ViewAttributes[] =[]
@Input ()
attributesValidations : any[] = []
@Output()
addRule = new EventEmitter<any>()
@Output()
rmvRule = new EventEmitter<any>()
@Output()
changeAlreadyExistent = new EventEmitter<void>()
@Input()
alreadExistentRule : boolean = false
validationRules : any= VALIDATION_RULES
objectValidationRules : any = OBJECTS_VALIDATION_ATTRIBUTES
customValidationRules : any[] =[]

changeExistent(){
this.changeAlreadyExistent.emit()
}

sendType(): string{
  let defValue : any = this.selectedAttribute?.defaultValue
  if(defValue !== null){
  return defValue["of"]
  }
  return ""
}

attributeTypePanel(): string{
  if(this.selectedAttribute === null){
    return "error"
  }
  if(this.selectedAttribute?.type==="object"){
    return "object"
  }
  if(this.selectedAttribute?.type==="user" || this.selectedAttribute?.type === "company"){
    return "predefined_object"
  }
  return "base_attribute"
}

addValidationRule($event:any){
  $event["attribute"] = this.selectedAttribute?.name
  $event["type"] = this.selectedAttribute?.type
  this.addRule.emit($event)
}

getObjectAttributes() : any[]{
  const panelType = this.attributeTypePanel();
  if( panelType === "predefined_object"){
    const type : string = this.selectedAttribute?.type ?? ''
    return this.objectValidationRules[type]
  }
  if(panelType === "object"){
    let defValue : any =this.selectedAttribute?.defaultValue ?? {}
    let keys =  Object.keys(defValue)
    if(keys.includes("value") && keys.includes("type")){
      return  Object.keys(defValue.value)
    }else{
      return keys
    }
  }
  return []
}

chnage_selcted(attribute:any){
  const panelType = this.attributeTypePanel();
  if( panelType === "predefined_object"){
    this.selectedAttribute = new ViewAttributes("",attribute.label,this.selectedAttribute?.name+"."+attribute.name,true,attribute.type,{},[],"",false,false)
  }else{
    let type = this.attributeType(attribute)
    let defaultValue = this.selectedAttribute?.defaultValue as { [key: string]: any };
    let  attr_name = this.selectedAttribute?.name +"."+ attribute
    let keys = Object.keys(defaultValue[attribute])
    if( type === "object" && keys.includes("value") && keys.includes("type")){
        let obj_type = defaultValue[attribute]["type"]
        this.selectedAttribute = new ViewAttributes("",attribute,attr_name,true,obj_type,defaultValue[attribute]["value"],[],"",false,false)
    }else{
    this.selectedAttribute = new ViewAttributes("",attribute,attr_name,true,type,defaultValue[attribute],[],"",false,false)
    }
  }
}

getAttribute(key : string) : any{
  let slctAttribute :any = this.selectedAttribute  as Object
  return slctAttribute[key]
}

isFloat(n: number): boolean {
  return Number(n) === n && n % 1 !== 0;
}

isDate(value: string): boolean {
  const parsedData = Date.parse(value)
  return !isNaN(parsedData);
}


attributeType(attribute:string) : string{
  let defaultValue = this.selectedAttribute?.defaultValue as { [key: string]: any };
  let type = typeof defaultValue[attribute];
  if(type === "number"){
      if(this.isFloat(defaultValue[attribute])){
        return "precision_number"
      }
      return "number"
    }
  if(type === "string"){
   if(this.isDate(defaultValue[attribute])){
    return "date"
   }
   return"text"
  }
  if(type === "object"){
    if(Array.isArray(defaultValue[attribute])){
      return "array"
    }
    if( "id" in defaultValue[attribute] && "collection" in defaultValue[attribute]){
       let objectValue= defaultValue[attribute] as { [key: string]: any };
       switch(objectValue["collection"]){
        case "users":
          return "user"
        case "companies":
          return "company"
       }
    }else{
    return "object"
    }
  }
  return "undefined"
}

removeRule($event: any){
this.rmvRule.emit($event)
}

getValidations(){
  const type: string = this.selectedAttribute?.type ?? "";
  if(type == null){
    return []
  }
  return this.validationRules[type]
}
toggle(event : Event) : void{
  const toggleButton = event.target as HTMLElement;
  const collasible = toggleButton.parentElement;
   const collapsibleContent = collasible?.nextElementSibling as HTMLElement;
   if(collapsibleContent){
     if(collapsibleContent.style.display === "block"){
       collapsibleContent.style.display = "none"
     }else{
       collapsibleContent.style.display = "block"
     }
   }
 }
}
