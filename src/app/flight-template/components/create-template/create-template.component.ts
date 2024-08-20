import {  Component } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';
import { FlightTemplateService } from '../../services/flight-template.service';
import { ActivatedRoute } from '@angular/router';
import { FlightTemplate, UpdateFlightTemplate } from '../../models/FlightTemplate';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {
templateEditName : string | null = null
 value:string = ""
 draggedAttribute: ViewAttributes | null= null
 attributeList : ViewAttributes[] = []
 avialableAttributes : ViewAttributes[] =[]
 selectedAttributes : ViewAttributes[] =[]
 selectedAttribute : ViewAttributes | null = null
 validationRules : any[] = []
 templateRules = []
 searchText : string = ""
 createAttribute: boolean = false
 operation : string = "Save Attribute"
 alreadExistentRule : boolean = false
 template_name_err : boolean =  false
 attributes_err : boolean = false

 constructor(private flightTemplateService:FlightTemplateService, private route:  ActivatedRoute, private messageService:MessageService){}

 resetErrors(){
  this.template_name_err = false
  this.attributes_err = false
 }

 deleteAttribute(attribute: ViewAttributes){
  this.flightTemplateService.deleteAttribute(attribute.id).subscribe((response: string) =>{
    this.getAttributes()
  })
 }

 newAttribute(){
  this.createAttribute = true
  this.selectedAttribute = null
  this.operation = "Save Attribute"
 }

 serchAttribute(event :Event){
  let keyEvent = event as KeyboardEvent
  const input = event.target as HTMLInputElement
  if (keyEvent.key  === 'Enter') {
   let text = input.value
   this.filterAttribute(text)
  }
   if(keyEvent.key==="Backspace" && input.value===""){
    this.attributeList = this.avialableAttributes
   }
 }

 filterAttribute(key: string){
  this.attributeList = []
  let unusedKeys : ViewAttributes[] = this.removeUsedAttributes(this.avialableAttributes)
  this.attributeList = unusedKeys.filter(attribute =>{
   return this.keycontainedInSerchKeywords(key,attribute.searchKeyWords)
  })
 }
  removeUsedAttributes(attributes: ViewAttributes[]){
    let selectedAttriutesNames =  this.selectedAttributes.map((attr) => attr.name)
    return this.avialableAttributes.filter((attribute)=>{
      return !selectedAttriutesNames.includes(attribute.name)
    })
  }

keycontainedInSerchKeywords(key: string, keys:string[]):boolean{
  for (let index in keys) {
    if(keys[index].includes(key)){
      return true
    }
  }
return false
}

initPageWitTemplateData(){
let templateName = this.templateEditName ??  ""
this.flightTemplateService.getTemplate(templateName).subscribe((response:FlightTemplate)=>{
  let slctAttrs : ViewAttributes[] = response.attributes.map((attr)=>{
    return new ViewAttributes("",attr.label,attr.name,attr.required,attr.type,attr.defaultValue,[],attr.description,true,true)
  })
  this.selectedAttributes = slctAttrs
  this.validationRules = response.validations
  this.value = response.name
})
}

regiseterTemplate(){
  if(this.value ===""){
    this.template_name_err = true
    this.messageService.add({severity:'error',summary:'Error',detail:'The name should not be empty', life:1000})
  }
  if(this.selectedAttributes.length === 0){
    this.attributes_err = true;
    this.messageService.add({severity:'error',summary:'Error',detail:'You should chose at last one attribute', life:1000})
  }
  if(!this.template_name_err && !this.attributes_err){
  if(this.templateEditName === null){
    let template = new FlightTemplate(this.value,this.selectedAttributes,this.validationRules)
    this.flightTemplateService.saveTemplate(template).subscribe()
  }else{
  let username  = localStorage.getItem("username") ?? ""
  let template = new  UpdateFlightTemplate(this.templateEditName ?? "",this.value,username,this.selectedAttributes,this.validationRules)
  this.flightTemplateService.updateTemplate(template).subscribe()
  }
  }
}

getPageScope(){
  if(this.templateEditName === null){
    return "Create"
  }
  return "Update"
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.templateEditName = params.get('id');
  });
  if(this.templateEditName !== null){
    this.initPageWitTemplateData()
  }
  this.getAttributes()
}

attributeChanges($event :any){
  this.getAttributes()
}

getAttributes(){
  this.flightTemplateService.getAvailableAttributes().subscribe(
    (result:ViewAttributes[])=>{
      this.avialableAttributes = result
      if(this.searchText !== ""){
        this.filterAttribute(this.searchText)
      }else{
        this.attributeList = this.removeUsedAttributes(result)
      }
    });
}

selectAttribute(attribute : ViewAttributes, enableCreate: boolean):void{
  this.selectedAttribute = attribute;
  this.createAttribute=enableCreate
  this.operation =  "Update Attribute"
}

toggle(event : Event) : void{
  
 const toggleButton = event.target as HTMLElement;
 const collasible = toggleButton.parentElement;
 if(parent){
  var collapsibleContent = collasible?.nextElementSibling as HTMLElement;
  if(collapsibleContent == null){
    collapsibleContent = collasible as HTMLElement;
  }
  if(collapsibleContent.className != "collapsible-content"){
    while(!collapsibleContent.classList.contains("collapsible")){
      collapsibleContent = collapsibleContent?.parentElement as HTMLElement;
    }
    collapsibleContent = collapsibleContent?.nextElementSibling as HTMLElement;
  }
  if(collapsibleContent){
    if(collapsibleContent.style.display === "flex"){
      collapsibleContent.style.display = "none"
    }else{
      collapsibleContent.style.display = "flex"
    }
  }
 }
}

drop() {
if(this.draggedAttribute !== null){
  this.draggedAttribute.id=""
  this.selectedAttributes = [...this.selectedAttributes,this.draggedAttribute]
   this.attributeList = this.attributeList.filter(attribute => attribute.id !== this.draggedAttribute?.id)
  this.draggedAttribute = null
  this.resetErrors()
}
}

unselectAttribute(attribute : ViewAttributes){
this.selectedAttributes = this.selectedAttributes.filter(attr => attribute.name !== attr.name)
this.selectedAttribute = null
this.attributeList = this.removeUsedAttributes(this.avialableAttributes)
}

dragEnd() {
this.draggedAttribute=null
}
dragStart(attribute: ViewAttributes) {
this.draggedAttribute=attribute
}

addValidationRule($event : any){
  console.log($event)
  let isAlreadyInList = false
  this.validationRules.forEach((rule: any)=>{
    let keys = Object.keys($event)
    let containesAllKeys : boolean = true
    keys.forEach((key)=>{
      if(rule[key] === undefined){
        containesAllKeys = false
      }
    })
    if(containesAllKeys){
      let allKeysEquals = true
      keys.forEach((key)=>{
        if(rule[key] !== $event[key]){
            allKeysEquals = false
        }
      })
      if(allKeysEquals){
        isAlreadyInList = true
      }
    }
  })
  if(!isAlreadyInList){
    this.validationRules = [...this.validationRules,$event]
  }else{
    this.alreadExistentRule = true
  }
}

removeRule($event : any ){
   this.validationRules = this.validationRules.filter((rule)=>{
    let keys = Object.keys($event)
    let containesAllKeys : boolean = true
    keys.forEach((key)=>{
      if(rule[key] === undefined){
        containesAllKeys = false
      }
    })
    if(containesAllKeys){
      let allKeysEquals = true
      keys.forEach((key)=>{
        if(rule[key] !== $event[key]){
            allKeysEquals = false
        }
      })
      if(allKeysEquals){
        return false
      }else{
        return true
      }
    }else{
      return true
    }
   })
}

changeExistent(){
  this.alreadExistentRule = false
}

updateSelected($event: ViewAttributes){
  this.selectedAttributes =  this.selectedAttributes.filter((attr)=>{
    return !(attr.name === $event.name)
  })
  this.selectedAttributes.push($event)
  this.validationRules =  this.validationRules.filter((rule)=>{
    return !(rule.attribute === $event.name)
  })
}
}
