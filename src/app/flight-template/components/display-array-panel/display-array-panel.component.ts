import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-array-panel',
  templateUrl: './display-array-panel.component.html',
  styleUrls: ['./display-array-panel.component.css']
})
export class DisplayArrayPanelComponent implements OnInit, OnChanges{
@Input()
slectedType : string | undefined
@Input ()
contentArray : any [] = []
@Input ()
ediatble : boolean = true
@Output()
removeEvent = new EventEmitter<number>()
@Output()
editEvent = new EventEmitter<number>()
displyArray : any[] = []

ngOnInit(): void {
  
}

ngOnChanges(changes: SimpleChanges): void {
  if(changes["contentArray"]){
   this.initDisplayArray()
  }
}

initDisplayArray(){
    if(this.slectedType === "object"){
      this.displyArray = []
      this.contentArray.forEach((element)=>{
        let message = this.objectToString(element)
        this.displyArray.push(message)
      })
    }else{
      if(this.slectedType === "array"){
        console.log(this.contentArray)
        this.displyArray = []
        this.contentArray.forEach((element) => {
            let message = this.arrayMessage(element)
            this.displyArray.push(message)
        })
      }else{
        if(this.slectedType === "date"){
          this.displyArray = []
          this.contentArray.forEach((element) => {
            let dateMsg : string = this.dateMesage(element)
            this.displyArray.push(dateMsg)
          })
        }else{
        this.displyArray = this.contentArray
        }
      }
    }
}

dateMesage(compoundDate: any):string{
let date: Date  = new Date(compoundDate["date"])
let time = new Date(compoundDate["time"])
const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const formattedTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
const msg = `${formattedDate} ${formattedTime}`
return msg;
}


arrayMessage(element : any) :string{
    let message = "("
    if(element["of"] === "date"){
      element["values"].forEach((arrayElement: any)=>{
        let dateMsg = this.dateMesage(arrayElement)
        message+= dateMsg+", "
    })
    }else{
    if(element["of"] === "array"){
      element["values"].forEach((arrayElement: any)=>{
        message+= this.arrayMessage(arrayElement["values"])+", "
    })
    }else{
       if(element["of"] === "object"){
        element["values"].forEach((arrayElement: any)=>{
          message+= this.objectToString(arrayElement)+", "
      })
       }else{
        if(element.constructor.name == "Array"){
          element.forEach((arrayElement: any)=>{
            message+= arrayElement+", "
        })}
        else{
          element["values"].forEach((arrayElement: any)=>{
            message+= arrayElement+", "
        })
        }
       }
    }
    }
    if(element["of"] === "user" || element["of"] === "company"){
      message = "Empty list"
    }else{
    message = message.slice(0,-2)+ ")<br>"
    }
    return message
}

objectToString( obj : any) : string{
 let keys : string[] = Object.keys(obj)
 let tagMessage  : string = ""
 keys.forEach((key) =>{
     tagMessage += `${key}:`
     if(obj[key]['type'] === "object"){
      tagMessage += "<br> <div class='obj-content'>" + this.objectToString(obj[key]["value"]) + "</div><br>"
     }else{
      if(obj[key]["type"] ==="date"){
          let dateMsg = this.dateMesage(obj[key]["value"])
           tagMessage += dateMsg + "<br>"
      }else{
        tagMessage += obj[key]["value"] + "<br>"
      }
     }
 })
 return tagMessage;
}


editElemnt(index : number){
  this.editEvent.emit(index)
}


removeElement(index: number){
  this.removeEvent.emit(index)
}

getIndexArray(){
  return Array.from({length: this.displyArray.length}, (_, i) => i);
}

getIndexElement (index : number){
  return this.displyArray[index]
}

}
