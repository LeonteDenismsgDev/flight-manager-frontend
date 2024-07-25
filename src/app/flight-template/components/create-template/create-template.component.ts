import { Attribute, Component } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';
import { FlightTemplateService } from '../../services/flight-template.service';
import { VALIDATION_RULES } from '../../models/ValidationRules';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
 value:string = "Template Name"
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

 constructor(private flightTemplateService:FlightTemplateService){}

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
  this.attributeList = this.avialableAttributes.filter(attribute =>{
   return this.keycontainedInSerchKeywords(key,attribute.searchKeyWords)
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

ngOnInit(): void {
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
        this.attributeList = result
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

drop() {
if(this.draggedAttribute !== null){
  this.selectedAttributes = [...this.selectedAttributes,this.draggedAttribute]
   this.attributeList = this.attributeList.filter(attribute => attribute.id !== this.draggedAttribute?.id)
  this.draggedAttribute = null
}
}

unselectAttribute(attribute : ViewAttributes){
this.attributeList.push(attribute)
this.selectedAttributes = this.selectedAttributes.filter(attr => attribute.id !== attr.id)
this.selectedAttribute = null
}

dragEnd() {
this.draggedAttribute=null
}
dragStart(attribute: ViewAttributes) {
this.draggedAttribute=attribute
}

addValidationRule($event : any){
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
}
