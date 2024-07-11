import { Component, Input } from '@angular/core';
import { ViewAttributes } from '../../models/Attribute';

@Component({
  selector: 'app-validation-rule',
  templateUrl: './validation-rule.component.html',
  styleUrls: ['./validation-rule.component.css']
})
export class ValidationRuleComponent {
  @Input()
   rule : any
  @Input()
  selectedAttributes : ViewAttributes[] = []
  @Input()
  attributeType : string =''
  possibleValues: { [key: string]: any[] } = {};

   
onInputEnter(event:Event,rule:any){
  console.log("ama ajuns aici")
  const input = event.target as HTMLInputElement
  if (!this.possibleValues[rule.name]) {
    this.possibleValues[rule.name] = [];
  }
  if(input.value !== ''){
  this.possibleValues[rule.name].push(input.value)
  input.value=''
  }
}

}
