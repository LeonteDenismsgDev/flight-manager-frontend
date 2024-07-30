import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Attribute, RegisterAttribute, ViewAttributes } from '../../models/Attribute';
import { FlightTemplateService } from '../../services/flight-template.service';
import { ServiceResponse } from '../../models/ServiceResponse';

@Component({
  selector: 'app-attribute-panel',
  templateUrl: './attribute-panel.component.html',
  styleUrls: ['./attribute-panel.component.css']
})
export class AttributePanelComponent{
  @Input()
  panelMode : string = "create"
  @Input()
  type : string | undefined = "";
  @Input()
  name : string | undefined = ""
  @Input()
  isRequired : boolean | undefined = false
  @Input()
  isGlobal : boolean | undefined = false
  @Input ()
  description : string | undefined = ""
  @Input ()
  defaultValue : any
  @Input ()
  operation : string = "Save Attribute"
  @Output()
  attributeChanges = new EventEmitter<any>()
  @Output()
  updateSeelected = new EventEmitter<ViewAttributes>()
  attributTypes :string[] =["text","number","precision_number","object","date","user","company","array"]
  display_name_error: boolean =  false
  display_description_error : boolean = false
  display_type_error : boolean = false
  display_array_error : boolean = false
  incorrect_attr_name = false
  @Input ()
  selectedAttribute: ViewAttributes | null = null
  child_defaultValue : any


  constructor(private flightTemplateService:FlightTemplateService){}


  changeStatus(): void {
      this.display_name_error =  false
      this.display_description_error  = false
      this.display_type_error  = false
      this.incorrect_attr_name =false
  }

  reciveValue($event :any){
    this.display_array_error = false
    this.child_defaultValue = $event
   }

   saveAttribute(){
    if(this.name ===  null || this.name === ""){
      this.display_name_error = true
    }else{
      const hasNumber = /\d/;
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-]/;
      this.incorrect_attr_name =  hasNumber.test(this.name ?? "") || hasSpecialChar.test(this.name ?? "");
    }
    if( this.description === null || this.description === ""){
      this.display_description_error = true
    }
    if(this.type === null || this.type === ""){
      this.display_type_error = true
    }
    if(this.type === "array" && (this.child_defaultValue === null || this.child_defaultValue === undefined)){
      this.display_array_error = true
    }

    if(!this.display_description_error && !this.incorrect_attr_name && !this.display_name_error && !this.display_type_error && !this.display_array_error){
      if(this.isGlobal == null){
        this.isGlobal = false
      }
      if(this.isRequired == null){
        this.isRequired = false
      }
      if(this.operation.toLowerCase().includes("save")){
      this.flightTemplateService.saveAttribute(new RegisterAttribute(String(this.name),this.isGlobal as boolean,this.isRequired as boolean,String(this.type),this.child_defaultValue,String(this.description))).subscribe( (response: string) =>{
        this.attributeChanges.emit(response)
      })
      this.type = ""
      this.description = ""
      this.isGlobal = false
      this.isRequired = false
      this.name = ""
      }else{
        let updatedAttribute = new ViewAttributes(
          this.selectedAttribute?.id ?? "",
          String(this.name),
          this.selectedAttribute?.name ?? "",
          this.isRequired as boolean,
          String(this.type),
          this.child_defaultValue,
          this.selectedAttribute?.searchKeyWords ?? [],
          String(this.description),
          this.selectedAttribute?.editable ?? true,
          this.isGlobal as boolean
        )
        if(this.selectedAttribute?.id !== ""){
        this.flightTemplateService.updateAttribute(updatedAttribute).subscribe((response:string) =>{
          this.attributeChanges.emit(response)
        })
        this.attributeChanges.emit("edit_attribute")
        }else{
          updatedAttribute.name = this.toAttributeName(this.name ?? "")
          this.updateSeelected.emit(updatedAttribute)
        }
      }
      this.child_defaultValue = undefined
    }
   }
   toAttributeName(name: string): string {
    const words = name.split(/[\s-_]+/);
    let attributeName = "";
    for (let wordNumber = 0; wordNumber < words.length; wordNumber++) {
      if (wordNumber === 0) {
        attributeName += words[wordNumber].toLowerCase();
      } else {
        attributeName += words[wordNumber].charAt(0).toUpperCase() + words[wordNumber].slice(1).toLowerCase();
      }
    }
    return attributeName;
  }
}
