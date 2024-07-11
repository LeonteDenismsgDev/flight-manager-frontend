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
 avialableAttributes : ViewAttributes[] =[]
 selectedAttributes : ViewAttributes[] =[]
 selectedAttribute : ViewAttributes | null = null
 validationRules : any= VALIDATION_RULES
 templateRules = []

 constructor(private flightTemplateService:FlightTemplateService){}

ngOnInit(): void {
  this.flightTemplateService.getAvailableAttributes().subscribe(
    (result:ViewAttributes[])=>{
      console.log(result)
      this.avialableAttributes = result
    });
}

getValidations(){
  const type: string = this.selectedAttribute?.type ?? "";
  if(type == null){
    return []
  }
  return this.validationRules[type]
}

selectAttribute(attribute : ViewAttributes):void{
  this.selectedAttribute = attribute;
  console.log(this.selectAttribute)
}

toggle(event : Event) : void{
 const toggleButton = event.target as HTMLElement;
 const collasible = toggleButton.parentElement;
 if(parent){
  const collapsibleContent = collasible?.nextElementSibling as HTMLElement;
  console.log(collapsibleContent)
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
  this.selectedAttributes.push(this.draggedAttribute as ViewAttributes)
   this.avialableAttributes = this.avialableAttributes.filter(attribute => attribute.id !== this.draggedAttribute?.id)
  this.draggedAttribute = null
}
}

unselectAttribute(attribute : ViewAttributes){
this.avialableAttributes.push(attribute)
this.selectedAttributes = this.selectedAttributes.filter(attr => attribute.id !== attr.id)
}

dragEnd() {
this.draggedAttribute=null
}
dragStart(attribute: ViewAttributes) {
this.draggedAttribute=attribute
}
}
