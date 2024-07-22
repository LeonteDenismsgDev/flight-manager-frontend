import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';

@Component({
  selector: 'app-validation-rule',
  templateUrl: './validation-rule.component.html',
  styleUrls: ['./validation-rule.component.css']
})
export class ValidationRuleComponent implements OnInit, OnChanges{
  @Input()
   rule : any
  @Input()
  selectedAttributes : ViewAttributes[] = []
  @Input ()
  templateSelectedAttribute : string = ""
  filteredAttributes : ViewAttributes[] = []
  @Input()
  attributeType : string =''
  @Output()
  addValidationRule = new EventEmitter<any>();
  selectedObject : any | undefined
  possibleValues: { [key: string]: any[] } = {};
  textReference : string = ""
  selectedAttribute : ViewAttributes | undefined
  startSelectedAttribute : ViewAttributes | undefined
  endSelectedAttribute : ViewAttributes | undefined
  arrayTextReference : string = ""
  numberReference : number | undefined
  dateReference : Date| undefined
  timeReference : Date | undefined
  text_err_msg : boolean = false
  array_err_msg : boolean = false
  number_err_msg : boolean = false
  date_err_msg  : boolean = false
  time_err_msg : boolean = false
  dt_err_msg : boolean = false
  start_date_err_msg : boolean = false
  start_dt_err_msg : boolean = false
  start_time_err_msg : boolean = false
  end_date_err_msg : boolean = false
  end_dt_err_msg : boolean = false
  end_time_err_msg : boolean = false
  endDateReference : Date | undefined
  endTimeReference : Date | undefined
  startDateReference : Date | undefined
  startTimeReference : Date | undefined
  ruleObjectText : string = ""
  finalSelectedAttribute : string | undefined

  ngOnInit(): void {
      this.filteredAttributes = this.selectedAttributes.filter(attribute =>{
        return attribute.name !== this.templateSelectedAttribute && (attribute.type === this.rule.inputType || attribute.type ==="object")
      })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if( changes["selectedAttributes"]){
      this.filteredAttributes = this.selectedAttributes.filter(attribute =>{
        return attribute.name !== this.templateSelectedAttribute && (attribute.type === this.rule.inputType || attribute.type ==="object")
      })
    }
  }

  changeToText(){
    if(this.selectedAttribute != undefined){
      this.selectedAttribute =  undefined
    }
    if(this.startSelectedAttribute != undefined){
      this.startSelectedAttribute =  undefined
    }
    if(this.endSelectedAttribute != undefined){
      this.endSelectedAttribute =  undefined
    }
    this.selectedObject = undefined
    this.ruleObjectText = ""
    this.finalSelectedAttribute = undefined
    this.text_err_msg = false
    this.array_err_msg = false
    this.number_err_msg = false
    this.date_err_msg = false
    this.start_date_err_msg = false
    this.start_time_err_msg = false
    this.start_dt_err_msg = false
    this.end_date_err_msg = false
    this.end_dt_err_msg = false
    this.end_time_err_msg = false
  }

  addRule(){
    let ruleName : string = this.rule.name
    let ruleValue : any
    if(this.rule.inputType === "text"){
      if((this.textReference === "" || this.textReference=== undefined) && (this.selectedAttribute === undefined && this.finalSelectedAttribute === undefined)){
        this.text_err_msg = true
      }else{
      ruleValue = this.selectedAttribute?.name ?? "'"+this.textReference+"'"
      }
    }
    if(this.rule.inputType === "array"){
      if(this.possibleValues[this.rule.name] === undefined){
          this.array_err_msg = true
      }else{
      if(this.possibleValues[this.rule.name].length === 0 && this.selectedAttribute === undefined){
        this.array_err_msg = true
      }else{
      ruleValue = this.selectedAttribute?.name ?? this.possibleValues[this.rule.name]
      }
    }
    }
    if(this.rule.inputType === "number" || this.rule.inputType === "precision_number"){
      if((this.numberReference === undefined || this.numberReference === null) && this.selectedAttribute === undefined){
        this.number_err_msg = true
      }else{
      ruleValue = this.selectedAttribute?.name ?? this.numberReference
      }
    }

    if(this.rule.inputType === "date"){
      if(this.dateReference === undefined ){
        this.dt_err_msg = true
        this.date_err_msg = true
      }
      if(this.timeReference === undefined ){
        this.time_err_msg = true
        this.date_err_msg = true
      }
      if(this.dateReference !== undefined && this.timeReference !== undefined){
        ruleValue = this.composeDate(this.dateReference,this.timeReference)
      }else{
        if(this.dateReference === undefined){
          this.dt_err_msg = true
          this.date_err_msg = true
        }else{
          ruleValue = this.selectedAttribute
        }
      }
    }
    if(this.rule.inputType === "interval"){
      let startTime = undefined
      let endTime = undefined
      if( this.startSelectedAttribute === undefined){
        if(this.startDateReference === undefined && this.startTimeReference === undefined){
        this.start_date_err_msg = true
        this.start_dt_err_msg = true
        }else{
          if(this.startDateReference === undefined ){
            this.start_date_err_msg = true
            this.start_dt_err_msg = true
          }
          if(this.startTimeReference === undefined ){
            this.start_date_err_msg = true
            this.start_time_err_msg = true
          }
          if(this.startDateReference !== undefined && this.startTimeReference !== undefined ){
            startTime = this.composeDate(this.startDateReference, this.startTimeReference)
          }
        }
      }else{
        startTime = this.startSelectedAttribute
      }
      if( this.endSelectedAttribute === undefined){
        if(this.endDateReference === undefined && this.endTimeReference === undefined){
        this.end_date_err_msg = true
        this.end_dt_err_msg = true
        }else{
          if(this.endDateReference === undefined ){
            this.end_date_err_msg = true
            this.end_dt_err_msg = true
          }
          if(this.endTimeReference === undefined ){
            this.end_date_err_msg = true
            this.end_time_err_msg = true
          }
          if(this.endDateReference !== undefined && this.endTimeReference !== undefined ){
            endTime = this.composeDate(this.endDateReference, this.endTimeReference)
          }
        }
      }else{
        startTime = this.startSelectedAttribute
      }
      if(startTime !== undefined && endTime !== undefined ){
        this.addValidationRule.emit({
          start:startTime,
          end:endTime
        })
      }
    }else{
      this.addValidationRule.emit(  {
        [ruleName] : ruleValue
       })
    }
  }

  composeDate(inDate:Date | undefined,inTime:Date | undefined):Date{
    let date: Date = inDate as Date
    let time: Date = inTime as Date
    time.setDate(date.getDate())
        time.setFullYear(date.getFullYear())
        time.setMonth(date.getMonth())
        return time
  }

  selectAttribute(attribute : ViewAttributes){
    let  isObject  = this.checkFoObject(attribute)
    if(this.rule.inputType === "text"){
      this.textReference = ""
    }
    if(this.rule.inputType === "array"){
      this.arrayTextReference = ""
      this.possibleValues[this.rule.name] =[]
    }
    if(this.rule.inputType === "number" || this.rule.inputType=== "precision_number"){
      this.numberReference = undefined
    }
    if(this.rule.inputType === "date"){
      this.dateReference = undefined
      this.timeReference = undefined
    }
    if(!isObject){
    this.selectedAttribute = attribute
    this.selectedObject = undefined
    this.finalSelectedAttribute = undefined
    this.ruleObjectText = ""
    }
    this.text_err_msg = false
    this.array_err_msg = false
    this.number_err_msg = false
    this.date_err_msg = false
  }

  checkFoObject(attribute: ViewAttributes){
    if(attribute.type === "object"){
     let defaultValue : any = attribute.defaultValue
     let keys : string[] = Object.keys(defaultValue)
      let obj : any  =  {}
     keys.forEach( (key) =>{
      if(defaultValue[key]["type"]===this.rule.inputType || defaultValue[key]["type"]==="object"){
        if(defaultValue[key]["type"] === "object"){
          let obj_keys : string[] = Object.keys(defaultValue[key]["value"])
          let contains_attrs : boolean = false
          obj_keys.forEach((obj_key) =>{
            console.log(defaultValue[key]["value"][obj_key]["type"] + " "+ this.rule.inputType)
            if(defaultValue[key]["value"][obj_key]["type"] === this.rule.inputType || defaultValue[key]["value"][obj_key]["type"] === "object"){
              contains_attrs = true
            }
          })
          if( contains_attrs){
            obj[key] = defaultValue[key]
          }
        }else{
        obj[key] = defaultValue[key]
        }
      }
     }
     )
     this.selectedObject = obj
     this.selectedAttribute = undefined
     this.finalSelectedAttribute = undefined
     this.ruleObjectText = attribute.name
     return true
    }
    return false
  }

  selectAttr(attribute: string){
   let type =  this.selectedObjecValueType(attribute)
   if( type !== "object"){
    let rule_name : string  = this.rule.name
    console.log({
      rule_name : this.ruleObjectText + "." + attribute
    })
    this.selectedObject = undefined
    this.finalSelectedAttribute = attribute
   }else{
      let obj : any = {}
      let atrr : any = this.selectedObject[attribute]["value"]
      let  keys :string[]  =  Object.keys(atrr)
      keys.forEach((key) =>{
        if(atrr[key]["type"] === this.rule.inputType || atrr[key]["type"] === "object"){
          if(atrr[key]["type"] === "object"){
           let attr_obj : any = atrr[key]["value"]
           let atrr_keys : string[] = Object.keys(attr_obj)
           let contains_attrs : boolean = false
           atrr_keys.forEach((attr_key)=>{
              if(attr_obj[attr_key]["type"] === this.rule.inputType || attr_obj[attr_key]["type"] === "object"){
                contains_attrs = true
              }
           })
           if(contains_attrs){
            obj[key] = atrr[key]
            this.ruleObjectText += "."+ attribute
           }
          }else{
            obj[key] = atrr[key]
            this.ruleObjectText += "."+ attribute
          }
        }
      })
      this.selectedObject = obj
   }
  }
   
onInputEnter(event:Event,rule:any){
  const input = event.target as HTMLInputElement
  if (!this.possibleValues[rule.name]) {
    this.possibleValues[rule.name] = [];
  }
  if(input.value !== ''){
  this.possibleValues[rule.name].push(input.value)
  input.value=''
  this.selectedAttribute = undefined
  this.selectedObject = undefined
  this.ruleObjectText = ""
  this.finalSelectedAttribute = undefined
  this.array_err_msg = false
  }
}

selectStartAttribute(attribute: ViewAttributes){
  let isObject  = this.checkFoObject(attribute)
  if( !isObject){
    this.startSelectedAttribute = attribute
    this.selectedObject = undefined
    this.finalSelectedAttribute = undefined
    this.ruleObjectText
  }
  this.startTimeReference = undefined
  this.startDateReference = undefined
  this.start_date_err_msg = false
  this.start_time_err_msg = false
  this.start_dt_err_msg = false
}

selectEndAttribute(attribute: ViewAttributes){
  let isObject  = this.checkFoObject(attribute)
  if( !isObject){
    this.endSelectedAttribute = attribute
    this.selectedObject = undefined
    this.finalSelectedAttribute = undefined
    this.ruleObjectText
  }
  this.endDateReference = undefined
  this.endTimeReference = undefined
  this.end_date_err_msg = false
  this.end_dt_err_msg = false
  this.end_time_err_msg = false
}

selectedObjectKeys(){
return Object.keys(this.selectedObject)
}
selectedObjecValueType(key:string){
return this.selectedObject[key]["type"]
}

removePossibleValue(tag: any){
this.possibleValues[this.rule.name] = this.possibleValues[this.rule.name].filter(elem => elem !== tag)
this.array_err_msg = false
}

}
