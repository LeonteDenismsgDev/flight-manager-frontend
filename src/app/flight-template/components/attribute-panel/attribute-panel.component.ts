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
  attributTypes :string[] =["text","number","precision_number","object","date","user","company","array"]
  display_name_error: boolean =  false
  display_description_error : boolean = false
  display_type_error : boolean = false
  @Input ()
  selectedAttribute: ViewAttributes | null = null
  child_defaultValue : any


  constructor(private flightTemplateService:FlightTemplateService){}


  changeStatus(): void {
      this.display_name_error =  false
      this.display_description_error  = false
      this.display_type_error  = false
  }

  reciveValue($event :any){
    this.child_defaultValue = $event
   }

   saveAttribute(){
    if(this.name ===  null || this.name === ""){
      this.display_name_error = true
    }
    if( this.description === null || this.description === ""){
      this.display_description_error = true
    }
    if(this.type === null || this.type === ""){
      this.display_type_error = true
    }
    if(typeof this.defaultValue === "object" && this.type === "object"){
    }

    if(!this.display_description_error && !this.display_name_error && !this.display_type_error){
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
        this.flightTemplateService.updateAttribute(updatedAttribute).subscribe((response:string) =>{
          this.attributeChanges.emit(response)
        })
        this.attributeChanges.emit("edit_attribute")
      }
      this.child_defaultValue = undefined
    }
   }
}
