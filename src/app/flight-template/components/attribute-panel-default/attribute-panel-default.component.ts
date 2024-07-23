import { Component, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges, Output, booleanAttribute } from '@angular/core';
import { every, throwIfEmpty } from 'rxjs';


@Component({
  selector: 'app-attribute-panel-default',
  templateUrl: './attribute-panel-default.component.html',
  styleUrls: ['./attribute-panel-default.component.css']
})
export class AttributePanelDefaultComponent implements OnChanges{
@Input()
slectedType: string | undefined
@Input()
attributTypes : string[] =[]
@Input()
superDefaultValue : string | undefined
@Output()
defaultValue = new EventEmitter<any>()
@Input()
clearInputs  : boolean = false
readonly : boolean = false
arrayContent  : any[] = []

inputs_clear : boolean = false
attr_text_value : string = ""
attr_number_value : number | undefined 
attr_precision_value : number| undefined 
attr_date_value : Date | undefined
att_time_value : Date | undefined
attr_object_value : string = ""
slctType : string =""
objectAttributes: { [key: string]: any } = {};
object_input_err : string | undefined
childValue : any
show_content : boolean = true
sp_DefaultValue : any
type_value_error_msg: string | undefined
update_attribute : boolean = false

constructor(private elem: ElementRef){}

deleteAttribute(attr_name: string){
  delete this.objectAttributes[attr_name]
  this.defaultValue.emit(this.objectAttributes)
}

updateAttribute(attr_name: string){
  this.attr_object_value = attr_name
  this.slctType= this.objectAttributes[attr_name]["type"]
  this.sp_DefaultValue = this.objectAttributes[attr_name]["value"]
  this.update_attribute = true
  this.readonly = true
}

updateAttr(){
  if( this.childValue === undefined || this.childValue == null || this.slctType === "" || this.slctType === null){
    if(this.slctType === "" || this.slctType === null){
        this.type_value_error_msg = "Unselected attribute type"
    }else{
      if(this.childValue ===  undefined || this.childValue == null){
        this.type_value_error_msg = "Empty value for attribute"
      }
    }
  }else{
this.readonly = false
this.objectAttributes[this.attr_object_value] ={
  "type": this.slctType,
  "value": this.childValue
}
this.updateState()
this.attr_object_value = ""
this.slctType = ""
this.update_attribute = false
}
}

ngOnChanges(changes: SimpleChanges): void {
  console.log(this.slectedType)
  if(changes['superDefaultValue']){
   this.updateValues(this.superDefaultValue)
  }
  else if(changes["slectedType"]){
   this.backToInit()
  }
  if(changes["clearInputs"]){
    if(this.clearInputs){
     this.backToInit();
    }
  }
}

backToInit(){
  this.objectAttributes={}
  this.attr_date_value = undefined
  this.att_time_value = undefined
  this.attr_number_value = undefined
  this.attr_precision_value = undefined
  this.attr_text_value = ""
  this.attr_object_value = ""
  this.arrayContent = []
}

updateValues(value : any){
  let obj_value = undefined
  if( this.slectedType === "text" && value!==undefined){
    this.attr_text_value = String(value)
    obj_value = this.attr_text_value
  }
  if(this.slectedType === "number" && value!==undefined){
    this.attr_number_value = Number(value)
    obj_value = this.attr_number_value
  }
  if(this.slectedType === "precision_number" && value!==undefined){
    this.attr_precision_value = Number(value)
    obj_value = this.attr_precision_value
  }
  if(this.slectedType === "date" && value!==undefined){
      this.attr_date_value= new Date(String(value["date"]))
      this.att_time_value= new Date(String(value["time"]))
    obj_value = {
      "date": this.attr_date_value,
      "time": this.att_time_value
  }
  }
  if(this.slectedType === "object" && value!==undefined){
    this.objectAttributes = value as Object
    obj_value = this.objectAttributes
  }
  if(this.slectedType === "array"){
    this.arrayContent = value["values"]
    this.slctType = value["of"]
    this.sp_DefaultValue = undefined

  }
  this.defaultValue.emit(obj_value)
}

addAttribute(event: Event){
 if(this.attr_object_value === ""){
  this.object_input_err = "Name should not be empty"
 }else{
  if(this.objectAttributes[this.attr_object_value] !== undefined){
    this.object_input_err = "There is already an attribute  with this name"
  }else{
  if( this.childValue === undefined || this.slctType === "" || this.slctType === null){
    if(this.slctType === "" || this.slctType === null){
        this.type_value_error_msg = "Unselected attribute type"
    }else{
      if(this.childValue ===  undefined){
        this.type_value_error_msg = "Empty value for attribute"
      }
    }
  }else{
  this.objectAttributes[this.attr_object_value] ={
    "type": this.slctType,
    "value": this.childValue
  }
  this.changeValue()
  this.attr_object_value = ""
  this.slctType = ""
  this.childValue=undefined
  this.object_input_err = undefined
  this.type_value_error_msg = undefined
  }
  }
  }
}
updateState(){
  this.object_input_err = undefined
  this.type_value_error_msg = undefined
}

changeValue(){
  if(this.slectedType === "text"){
    this.defaultValue.emit(this.attr_text_value)
  }
  if(this.slectedType === "number"){
    console.log(" am ajuns  aici  :"+ this.attr_number_value)
    this.defaultValue.emit(this.attr_number_value)
  }
  if(this.slectedType === "precision_number"){
    this.defaultValue.emit(this.attr_precision_value)
  }
  if(this.slectedType === "date"){
    if(this.attr_date_value !== undefined && this.att_time_value !== undefined){
      console.log(" acici")
    this.defaultValue.emit({
      date:this.attr_date_value,
      time:this.att_time_value
    })
  }
  }
  if(this.slectedType === "user"){
    this.defaultValue.emit("Empty user reference")
  }
  if(this.slectedType === "company"){
    this.defaultValue.emit("Empty company reference")
  }
  if(this.slectedType === "object"){
    console.log(this.objectAttributes)
    this.defaultValue.emit(this.objectAttributes)
  }
}

reciveValue($event :any){
 this.childValue = $event
 this.inputs_clear = false
}

addValueToArray(){
  if( this.childValue !== undefined && this.childValue !== null){
  this.arrayContent= [...this.arrayContent, this.childValue]
  console.log(this.childValue)
  console.log({
    of:this.slctType,
    values:this.arrayContent
  })
  this.defaultValue.emit(
    {
      of:this.slctType,
      values:this.arrayContent
    }
  )
  this.inputs_clear = true
  this.childValue = undefined
  }
}

removeValueFromArray($event : number){
  this.arrayContent.splice($event,1)
  this.arrayContent= [...this.arrayContent]
  this.defaultValue.emit(
    {
      of:this.slctType,
      values:this.arrayContent
    }
  )
}

editValueFromArray($event : number){
  this.sp_DefaultValue = this.arrayContent[$event]
  this.arrayContent.splice($event,1)
  this.arrayContent= [...this.arrayContent]
  console.log(this.arrayContent)
  this.defaultValue.emit(
    {
      of:this.slctType,
      values:this.arrayContent
    }
  )
}

changeArrayType(){
  this.arrayContent = []
  this.childValue = undefined
  let isPredefined = this.ckeckPredefinedType()
  if(isPredefined){
    this.defaultValue.emit(
      {
        of:this.slctType,
        values:[]
      }
    )
  }
}

ckeckPredefinedType() : boolean{
  return this.slctType === 'user' || this.slctType === "company"
}

}
