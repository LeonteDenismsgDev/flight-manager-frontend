import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';
import { OBJECTS_VALIDATION_ATTRIBUTES } from '../../models/ObjectValidationAttributes';
import { retry } from 'rxjs';

@Component({
  selector: 'app-validation-rule',
  templateUrl: './validation-rule.component.html',
  styleUrls: ['./validation-rule.component.css']
})
export class ValidationRuleComponent implements OnInit, OnChanges{
  @Input()
   rule : any
  @Input ()
  attrType : string =""
  @Input()
  selectedAttributes : ViewAttributes[] = []
  @Input ()
  templateSelectedAttribute : string = ""
  filteredAttributes : ViewAttributes[] = []
  @Output()
  addValidationRule = new EventEmitter<any>();
  @Output()
  rmvRule = new EventEmitter<any>()
  @Input()
  attributeValidations : any[] = []
  @Input()
  alreadyExsitentRule : boolean = false
  @Input()
  attributeName : string | undefined
  @Output()
  changeAlreadyExistent = new EventEmitter<void>();
  attributeTypes : string[] = ["text","number","precision_number","date","object","user","company","array"]
  selectedObject : any | undefined
  startSelectedObject : any | undefined
  endSelctedObject : any | undefined
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
  inv_array_err : boolean = false
  attr_err_msg : boolean = false
  endDateReference : Date | undefined
  endTimeReference : Date | undefined
  startDateReference : Date | undefined
  startTimeReference : Date | undefined
  ruleObjectText : string = ""
  startRuleObjectText : string = ""
  endRuleObjectText :string = ""
  finalSelectedAttribute : string | undefined
  finalStartSelectedAttribute : string | undefined
  finalEndSelctedAttribute : string | undefined
  emptySelectedObject : boolean = false
  predefineAttributes : any = OBJECTS_VALIDATION_ATTRIBUTES
  childValue : any

  reciveValue($event: any){
    this.childValue = $event
    this.selectedAttribute = undefined
    this.finalSelectedAttribute = undefined
    this.ruleObjectText = ""
    this.selectedObject = undefined
    this.changeAlreadyExistent.emit()
  }

  checkAvailableAttribute(attribute:ViewAttributes):boolean{
    if(attribute.name !== this.templateSelectedAttribute){
      if(attribute.type ==="object" || attribute.type === "user" || attribute.type === "company"){
        return true
      }else{
        if(this.rule.inputType ==="array"){
          if(attribute.type === "array"){
          let defValue: any = attribute.defaultValue
          return this.rule.of === defValue.of
          }else{
            return  false
          }
        }else{
          if(this.rule.inputType === "interval"){
            return attribute.type === "date"
          }else{
            if(this.rule.inputType === "attribute"){
              return attribute.type === this.attrType
            }else{
              return attribute.type === this.rule.inputType
            }
          }
        }
      }
    }
    return false
  }

  ngOnInit(): void {
      this.filteredAttributes = this.selectedAttributes.filter(attribute =>{
        return this.checkAvailableAttribute(attribute)
      })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if( changes["selectedAttributes"]){
      this.filteredAttributes = this.selectedAttributes.filter(attribute =>{
        return this.checkAvailableAttribute(attribute)
      })
    }
  }

  getValidationRules(){
    return this.attributeValidations.filter((rule)=>{
      if(this.rule.inputType === "interval"){
        let ruleName : string = this.rule.name
        let keys = ruleName.split(',')
         console.log(keys)
         return (Object.keys(rule).includes(keys[0]) || Object.keys(rule).includes(keys[1])) && rule.attribute === this.attributeName
      }else{
      return Object.keys(rule).includes(this.rule.name) && rule.attribute === this.attributeName
      }
    })
  }

  getRuleValue(rule:any){
    if(this.rule.inputType === "interval"){
      let ruleName: string = this.rule.name
      let ruleLabel : string = this.rule.label as string
      let keys = ruleName.split(',')
      let textRule = rule.attribute + " "+ ruleLabel.toLowerCase() + " "
       console.log(keys)
      for( let index in keys){
        textRule += rule[keys[index]] + " "
      }
      return textRule
    }else{
    let ruleLabel : string = this.rule.label as string
    let textRule = rule.attribute +' is ' + ruleLabel.toLowerCase() + " "+ this.createRuleValueMessage(rule[this.rule.name]);
    return textRule
    }
  }

  removeRule(rule: any){
    this.rmvRule.emit(rule)
    this.changeAlreadyExistent.emit()
  }

 createRuleValueMessage(ruleValue : any){
  if(ruleValue instanceof Object){
    if(ruleValue instanceof Date){
      return ruleValue
    }
    if(ruleValue["time"] != undefined){
      let time: Date  = ruleValue["time"] as Date
      let date : Date = ruleValue["date"] as Date
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    }
    if(ruleValue["of"] !== undefined){
      let values = ruleValue["values"]
      let txt = "["
      values.forEach((value: any) =>{
        txt += this.createRuleValueMessage(value) + " "
      })
      txt+="]"
      return txt
    }else{
      let txt = ""
       console.log(ruleValue)
      let keys : string[] = Object.keys(ruleValue)
      keys.forEach((key)=>{
        txt += key +"(" + this.createRuleValueMessage(ruleValue[key]["value"]) + ") "
      })
      return txt
    }
  }
  return ruleValue
 }

  changeToText(inp_type?: string){
    if(this.selectedAttribute != undefined){
      this.selectedAttribute =  undefined
    }
    if(this.startSelectedAttribute != undefined){
      this.startSelectedAttribute =  undefined
    }
    if(this.endSelectedAttribute != undefined){
      this.endSelectedAttribute =  undefined
    }
    if(inp_type !== undefined){
      if( inp_type === "start"){
        this.startSelectedObject = undefined
        this.startRuleObjectText = ""
        this.finalStartSelectedAttribute = undefined
      }else{
        this.endSelctedObject = undefined
        this.endRuleObjectText = ""
        this.finalEndSelctedAttribute = undefined
      }
    }
    this.changeAlreadyExistent.emit()
    this.selectedObject = undefined
    this.ruleObjectText = ""
    this.finalSelectedAttribute = undefined
    this.text_err_msg = false
    this.array_err_msg = false
    this.number_err_msg = false
    this.date_err_msg = false
    this.dt_err_msg = false
    this.time_err_msg = false
    this.start_date_err_msg = false
    this.start_time_err_msg = false
    this.start_dt_err_msg = false
    this.end_date_err_msg = false
    this.end_dt_err_msg = false
    this.end_time_err_msg = false
    this.emptySelectedObject = false
  }


  addRule(){
    let ruleName : string = this.rule.name
    let ruleValue : any
    if(this.rule.inputType === "text"){
      if((this.textReference === "" || this.textReference=== undefined) && (this.selectedAttribute === undefined && this.finalSelectedAttribute === undefined)){
        this.text_err_msg = true
      }else{
      if(this.textReference !== ""){
        ruleValue = "'"+this.textReference+"'"
      }else{
        ruleValue = this.selectedAttribute?.name ?? this.ruleObjectText
      }
      }
    }
    if(this.rule.inputType === "array"){
      if(this.possibleValues[this.rule.name] === undefined){
          this.array_err_msg = true
      }else{
      if(this.possibleValues[this.rule.name].length === 0 && this.selectedAttribute === undefined && this.finalSelectedAttribute === undefined){
        this.array_err_msg = true
      }else{
        if(this.possibleValues[this.rule.name] !== undefined && this.possibleValues[this.rule.name].length >0){
          ruleValue = this.possibleValues[this.rule.name]
        }else{
          ruleValue = this.selectedAttribute?.name ?? this.ruleObjectText
        }
      }
    }
    }
    if(this.rule.inputType === "number" || this.rule.inputType === "precision_number"){
      if((this.numberReference === undefined || this.numberReference === null) && this.selectedAttribute === undefined && this.finalSelectedAttribute === undefined){
        this.number_err_msg = true
      }else{
        if(this.numberReference === undefined || this.numberReference === null){
          ruleValue = this.selectedAttribute?.name ?? this.ruleObjectText
        }else{
          ruleValue =this.numberReference
        }
      }
    }
    if(this.rule.inputType === "attribute"){
      if(this.childValue === undefined && this.selectedAttribute === undefined && this.finalSelectedAttribute === undefined){
        this.attr_err_msg = true
      }else{
        if(this.childValue === undefined){
          ruleValue = this.selectedAttribute?.name ?? this.ruleObjectText
        }else{
          ruleValue = this.childValue
        }
      }
    }
    if(this.rule.inputType === "date"){
      if(this.dateReference === undefined && this.selectedAttribute == undefined && this.finalSelectedAttribute === undefined){
        this.date_err_msg = true
        this.dt_err_msg = true
      }
      if(this.timeReference === undefined && this.selectedAttribute == undefined && this.finalSelectedAttribute === undefined){
        this.date_err_msg = true
        this.time_err_msg = true
      }
      if(this.dateReference !== undefined && this.timeReference !== undefined){
        ruleValue = this.composeDate(this.dateReference,this.timeReference)
      }else{
        if(this.selectedAttribute == undefined && this.finalSelectedAttribute === undefined){
          this.dt_err_msg = true
          this.date_err_msg = true
        }else{
          ruleValue = this.selectedAttribute?.name ?? this.ruleObjectText
        }
      }
    }
    if(this.rule.inputType === "interval"){
      let startTime = undefined
      let endTime = undefined
      if( this.startSelectedAttribute === undefined){
        if(this.finalStartSelectedAttribute !== undefined){
            startTime = this.startRuleObjectText
        }else{
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
      }
      }else{
        startTime = this.startSelectedAttribute.name 
      }
      if( this.endSelectedAttribute === undefined){
        if(this.finalEndSelctedAttribute !== undefined){
          endTime = this.endRuleObjectText
      }else{
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
      }
      }else{
        endTime = this.endSelectedAttribute.name
      }
      if(startTime !== undefined && endTime !== undefined ){
        this.startDateReference = undefined
        this.endDateReference = undefined
        this.startTimeReference = undefined
        this.endTimeReference = undefined
        this.startSelectedAttribute = undefined
        this.endSelectedAttribute = undefined
        this.finalEndSelctedAttribute = undefined
        this.endRuleObjectText = ""
        this.endSelctedObject = undefined
        this.finalStartSelectedAttribute = undefined
        this.startRuleObjectText = ""
        this.startSelectedObject = undefined
        this.changeToText()
        this.addValidationRule.emit({
          start:startTime,
          end:endTime
        })
      }
    }else{
      if(ruleValue !== undefined && ruleValue !== null){
      this.addValidationRule.emit(  {
        [ruleName] : ruleValue
       })
      }
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
      if(!isObject){
      this.selectedAttribute = attribute
      }
    }
    if(this.rule.inputType === "array"){
      let defValue : any = attribute.defaultValue
      if(defValue["of"] === this.rule.of  && !isObject){
        this.selectedAttribute = attribute
      }else{
        this.inv_array_err = true
      }
      this.arrayTextReference = ""
      this.possibleValues[this.rule.name] =[]
    }
    if(this.rule.inputType === "number" || this.rule.inputType=== "precision_number"){
      this.numberReference = undefined
      if(!isObject){
      this.selectedAttribute = attribute
      }
    }
    if(this.rule.inputType === "date"){
      this.dateReference = undefined
      this.timeReference = undefined
      if(!isObject){
      this.selectedAttribute = attribute
      }
    }
    if(this.rule.inputType === "attribute"){
      this.childValue = undefined
      if(attribute.type === this.attrType){
        this.selectedAttribute = attribute
      }
    }

    if(!isObject){
    this.selectedObject = undefined
    this.finalSelectedAttribute = undefined
    this.ruleObjectText = ""
    this.emptySelectedObject = false
    }
    this.changeAlreadyExistent.emit()
    this.attr_err_msg = false
    this.text_err_msg = false
    this.array_err_msg = false
    this.number_err_msg = false
    this.date_err_msg = false
    this.inv_array_err = false
    this.dt_err_msg = false
  }

  checkFoObject(attribute: ViewAttributes,btn_type?:string){
    let obj : any  =  {}
    if(attribute.type === "object"){
     let defaultValue : any = attribute.defaultValue
     let keys : string[] = Object.keys(defaultValue)
     this.emptySelectedObject = true
     keys.forEach( (key) =>{
      if(defaultValue[key]["type"]===this.rule.inputType || defaultValue[key]["type"]==="object"){
        if(defaultValue[key]["type"] === "object"){
          let obj_keys : string[] = Object.keys(defaultValue[key]["value"])
          let contains_attrs : boolean = false
          obj_keys.forEach((obj_key) =>{
            if(defaultValue[key]["value"][obj_key]["type"] === this.rule.inputType || defaultValue[key]["value"][obj_key]["type"] === "object" || (this.rule.inputType === "interval" && defaultValue[key]["value"][obj_key]["type"] === "date")){
              contains_attrs = true
            }else{
              if(this.rule.inputType === "attribute" && defaultValue[key]["value"][obj_key]["type"] === this.attrType){
                contains_attrs = true
              }else{
                if(defaultValue[key]["value"][obj_key]["type"] === "user" ||  defaultValue[key]["value"][obj_key]["type"] === "company"){
                  contains_attrs = true
                }
              }
            }
          })
          if( contains_attrs){
            obj[key] = defaultValue[key]
            this.emptySelectedObject = false
          }else{
            if(this.rule.inputType === "attribute" && this.attrType === "object"){
              obj[key] = defaultValue[key]
              this.emptySelectedObject = false
            }
          }
        }else{
          if(defaultValue[key]["type"] === "array"){
            if(defaultValue[key]["value"]["of"]===this.rule.of){
              obj[key] = defaultValue[key]
              this.emptySelectedObject = false
            }
          }else{
            obj[key] = defaultValue[key]
            this.emptySelectedObject = false
          }
        }
      }else{
        if(this.rule.inputType ==="interval" && defaultValue[key]["type"] === "date"){
          obj[key] = defaultValue[key]
          this.emptySelectedObject = false
        }
        if(this.rule.inputType ==="attribute" && defaultValue[key]["type"] === this.attrType){
          obj[key] = defaultValue[key]
          this.emptySelectedObject = false
        }
        if(defaultValue[key]["type"] === "user" || defaultValue[key]["type"] ==="company"){
          let type: string = defaultValue[key]["type"]
          let attrs : any[] = this.predefineAttributes[type]
          attrs.forEach((attr) =>{
            if(attr.type === this.rule.inputType || (this.rule.inputType === "attribute" && attr.type === this.attrType) || (this.rule.inputType === "interval" && attr.type ==="date")){
              obj[key] = defaultValue[key]
              this.emptySelectedObject = false
            }
          })
        }
      }
     }
     )
     if(btn_type !== undefined){
        if(btn_type === "start"){
          this.startSelectedObject = obj
          this.startSelectedAttribute = undefined
          this.finalStartSelectedAttribute = undefined
          this.startRuleObjectText = attribute.name
        }else{
          this.endSelctedObject = obj
          this.endSelectedAttribute = undefined
          this.finalEndSelctedAttribute = undefined
          this.endRuleObjectText = attribute.name
        }
     }else{
      this.selectedObject = obj
      this.selectedAttribute = undefined
      this.finalSelectedAttribute = undefined
      this.ruleObjectText = attribute.name
     }
     return true
    }
    if(attribute.type === "user" || attribute.type === "company"){
      let attrs : any[] = this.predefineAttributes[attribute.type]
      this.emptySelectedObject  = true
      attrs.forEach((attr) => {
        if(attr.type === this.rule.inputType || attr.type === "object" || attr.type=== "user" || attr.type === "company"){
          obj[attr.name] = attr
          this.emptySelectedObject = false
        }else{
          if(this.rule.inputType === "interval" && attr.type === "date"){
            obj[attr.name] = attr
          this.emptySelectedObject = false
          }else{
            if(this.rule.inputType === "attribute" && this.attrType === attr.type){
              obj[attr.name] = attr
              this.emptySelectedObject = false
            }
          }
        }
      })
      this.selectedObject = obj
      this.finalSelectedAttribute =undefined
      this.ruleObjectText = attribute.name
      return true
  }
  return false
}

  selectAttr(attribute: string, inp_type? : string){
   let type =  this.selectedObjecValueType(attribute,inp_type)
   if( type !== "object"){
    if(type==="array"){
      if(this.rule.inputType ==="attribute" && this.attrType === "array"){
        this.ruleObjectText += "." + attribute
        this.selectedObject = undefined
        this.finalSelectedAttribute = attribute
        this.inv_array_err = false
      }else{
      if(this.selectedObject[attribute]["value"]["of"] === this.rule.of){
        this.ruleObjectText += "." + attribute
        this.selectedObject = undefined
        this.finalSelectedAttribute = attribute
        this.inv_array_err = false
      }else{
        this.inv_array_err = true
      }
    }
    }else{
      if(type === "user" || type === "company"){
          let obj : any =  {}
          let attrs : any[] = this.predefineAttributes[type]
          this.emptySelectedObject = true
          attrs.forEach((attr) =>{
            if(attr.type === this.rule.inputType || (this.rule.inputType === "attribute" && attr.type === this.attrType) || (this.rule.inputType === "interval" && attr.type ==="date")){
              let name = attr.name
              obj[name] = attr
              this.emptySelectedObject = false
            }
          }
          )
          this.selectedObject = obj
          this.ruleObjectText += "."+ attribute
          if(this.rule.inputType === "attribute"){
            this.finalSelectedAttribute = attribute
          }
      }else{
      if(inp_type !== undefined){
          if(inp_type === "start"){
            this.startRuleObjectText +="." +attribute
            this.startSelectedObject = undefined
            this.finalStartSelectedAttribute = attribute
          }else{
            this.endRuleObjectText +="." +attribute
            this.endSelctedObject = undefined
            this.finalEndSelctedAttribute = attribute
          }
      }else{
        let rule_name : string  = this.rule.name
        this.ruleObjectText += "." + attribute
        this.selectedObject = undefined
        this.finalSelectedAttribute = attribute
      }
    }
    }
   }else{
      let obj : any = {}
      let atrr : any | undefined
      if(inp_type !== undefined){
        if(inp_type == "start"){
          atrr  = this.startSelectedObject[attribute]["value"]
        }else{
          atrr = this.endSelctedObject[attribute]["value"]
        }
      }else{
       atrr =  this.selectedObject[attribute]["value"]
      }
      let  keys :string[]  =  Object.keys(atrr)
      this.emptySelectedObject = true
      keys.forEach((key) =>{
        if(atrr[key]["type"] === this.rule.inputType || atrr[key]["type"] === "object"){
          if(atrr[key]["type"] === "object"){
           let attr_obj : any = atrr[key]["value"]
           let atrr_keys : string[] = Object.keys(attr_obj)
           let contains_attrs : boolean = false
           atrr_keys.forEach((attr_key)=>{
              if(attr_obj[attr_key]["type"] === this.rule.inputType || attr_obj[attr_key]["type"] === "object"){
                contains_attrs = true
              }else{
                if(this.rule.inputType === "interval" && attr_obj[attr_key]["type"] === "date"){
                  contains_attrs = true
                }else{
                  if(this.rule.inputType === "attribute" && attr_obj[attr_key]["type"] === this.attrType){
                    contains_attrs = true
                  }else{
                    if(attr_obj[attr_key]["type"] === "user" || attr_obj[attr_key]["type"] === "company"){
                      contains_attrs = true
                    }
                  }
                }
              }
           })
           if(contains_attrs){
            obj[key] = atrr[key]
            this.emptySelectedObject = false
            this.setSelectedObject(attribute, inp_type)
           }else{
            if(this.rule.inputType === "attribute" && this.attrType === "object"){
              obj[key] = atrr[key]
              this.emptySelectedObject = false
              this.setSelectedObject(attribute)
            }
           }
          }else{
            obj[key] = atrr[key]
            this.emptySelectedObject = false
            if(!this.ruleObjectText.includes(attribute)){
            this.ruleObjectText += "."+ attribute
            }
          }
        }else{
          if(this.rule.inputType ==="interval" && atrr[key]["type"] === "date"){
            obj[key] = atrr[key]
            this.emptySelectedObject = false
            this.setSelectedObject(attribute,inp_type)
          }
          if(this.rule.inputType === "attribute" && atrr[key]["type"] === this.attrType){
            obj[key] = atrr[key]
            this.emptySelectedObject = false
            this.setSelectedObject(attribute)
          }
          if(atrr[key]["type"] === "user" || atrr[key]["type"] === "company"){
            let attrs : any[] = this.predefineAttributes[atrr[key]["type"]]
            let doesntConatinesAttr = true
            attrs.forEach((attr) =>{
            if(attr.type === this.rule.inputType || (this.rule.inputType === "attribute" && attr.type === this.attrType) || (this.rule.inputType === "interval" && attr.type ==="date")){
              doesntConatinesAttr = false
            }
           }
          )
          if(!doesntConatinesAttr){
            obj[key] = atrr[key]
            this.emptySelectedObject = false
          }
          }
        }
      })
      if(inp_type !== undefined){
        if(inp_type === "start"){
          this.startSelectedObject = obj
        }else{
          this.endSelctedObject = obj
        }
     }else{
      if( this.rule.inputType === "attribute" && this.attrType === "object"){
        if(Object.keys(obj).length===0){
          this.setSelectedObject(attribute)
        }
        this.selectedObject = obj
        this.finalSelectedAttribute = attribute
        this.selectedAttribute = undefined
        this.childValue = undefined
      }else{
      this.selectedObject = obj
      this.inv_array_err = false
      }
     }
   }
   this.changeAlreadyExistent.emit()
  }

setSelectedObject( atrribute: string,inp_type? : string){
  if(  inp_type !== undefined){
    if( inp_type === "start"){
      if(!this.startRuleObjectText.includes(atrribute)){
      this.startRuleObjectText += "."+ atrribute
      }
    }else{
      if(!this.endRuleObjectText.includes(atrribute)){
      this.endRuleObjectText += "."+ atrribute
      }
    }
  }else{
    if(!this.ruleObjectText.includes(atrribute)){
    this.ruleObjectText += "."+ atrribute
    }
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
  this.inv_array_err = false
  }
  this.changeAlreadyExistent.emit()
}

selectStartAttribute(attribute: ViewAttributes,int_btn_type?:string){
  let isObject  = this.checkFoObject(attribute, int_btn_type)
  if( !isObject){
    this.startSelectedAttribute = attribute
    this.startSelectedObject = undefined
    this.finalStartSelectedAttribute = undefined
    this.ruleObjectText = ""
    this.emptySelectedObject = false
  }else{
    this.startSelectedAttribute = undefined
  }
  this.startTimeReference = undefined
  this.startDateReference = undefined
  this.start_date_err_msg = false
  this.start_time_err_msg = false
  this.start_dt_err_msg = false
  this.changeAlreadyExistent.emit()
}

selectEndAttribute(attribute: ViewAttributes,int_btn_type?:string){
  let isObject  = this.checkFoObject(attribute, int_btn_type)
  if( !isObject){
    this.endSelectedAttribute = attribute
    this.endSelctedObject = undefined
    this.finalEndSelctedAttribute = undefined
    this.ruleObjectText = ""
    this.emptySelectedObject = false
  }else{
    this.endSelectedAttribute = undefined
  }
   this.changeAlreadyExistent.emit()
  this.endDateReference = undefined
  this.endTimeReference = undefined
  this.end_date_err_msg = false
  this.end_dt_err_msg = false
  this.end_time_err_msg = false
}

selectedObjectKeys(in_type?: string){
  if(in_type != undefined){
    if(in_type == "start"){
      console.log(Object.keys(this.startSelectedObject))
      return Object.keys(this.startSelectedObject)
    }else{
      return Object.keys(this.endSelctedObject)
    }
  }else{
    return Object.keys(this.selectedObject)
  }
}
selectedObjecValueType(key:string,in_type?: string){
  if(in_type != undefined){
    if(in_type == "start"){
      return this.startSelectedObject[key]["type"]
    }else{
      return this.endSelctedObject[key]["type"]
    }
  }else{
  return this.selectedObject[key]["type"]
  }
}

removePossibleValue(tag: any){
this.possibleValues[this.rule.name] = this.possibleValues[this.rule.name].filter(elem => elem !== tag)
this.array_err_msg = false
 this.changeAlreadyExistent.emit()
}

}
