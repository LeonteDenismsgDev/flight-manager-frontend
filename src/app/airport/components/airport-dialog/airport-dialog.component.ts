import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../models/Airport';

async function sleep(ms: number): Promise<void> {
  return new Promise(
      (resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-airport-dialog',
  templateUrl: './airport-dialog.component.html',
  styleUrls: ['./airport-dialog.component.scss']
})
export class AirportDialogComponent implements OnChanges{

  public get contactKeys(): string[] {
    return Object.keys(this.contactData);
}



  @Input() data:Airport|null = null;
  @Input() mode:string = "save";
  @Output() endDialog=new EventEmitter<any>();
  oldAirport:Airport = new Airport("","","","",{});
  submitEnabled:boolean = false;
  icao:string = ""
  iata:string = ""
  name:string = ""
  email:string= ""
  location:string = ""
  contactData:{[key:string]:string} = {};
  addContactMode: boolean = false;
  newKey:string = "";
  newValue:string = "";
  acknowledged:boolean = false;

  constructor(private service:AirportService, private cdr:ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data !== null){
      this.icao = this.data.icao;
      this.iata = this.data.iata;
      this.name = this.data.airportName;
      this.location = this.data.location;
      if(!("email" in this.data.contactData)){
        this.contactData["email"] = "";
      }
      this.email = this.data.contactData["email"];
      this.contactData = this.data.contactData;
      this.oldAirport = JSON.parse(JSON.stringify(this.data));
      console.log(this.oldAirport);
    }
    else{
      this.abortAddAirport();
    }
  }

  refreshSubmitState(){
    if(this.mode == "save"){
    this.submitEnabled = this.name.trim() != "" &&
                        this.iata.trim() != "" &&
                        this.icao.trim() != "" &&
                        this.email.trim()!= "" &&
                        this.location.trim() != "";
    }
    else if(this.mode =="edit"){
      this.submitEnabled = (this.name.trim() != "" && this.name != this.oldAirport.airportName) ||
                          (this.iata.trim() != "" && this.iata != this.oldAirport.iata) ||
                          (this.icao.trim() != "" && this.icao != this.oldAirport.icao) ||
                          (this.email.trim()!= "" && this.email != this.oldAirport.contactData["email"]) ||
                          (this.location.trim() != "" && this.location != this.oldAirport.location) ||
                          this.compareContactData(this.contactData,this.oldAirport.contactData);
      if(this.addContactMode){
        this.submitEnabled = this.submitEnabled &&
                            this.newKey.trim() != "" &&
                            this.newValue.trim() != "";
      }
    }
  }

  async submit(){
    if(this.mode == "save"){
    let sendData:Airport = new Airport(this.icao,this.iata,this.name,this.location,{"email":this.email});
    this.service.submitAirport(sendData).subscribe(()=>{});
    await sleep(10);
    this.endDialog.emit();
    }
    else if(this.mode == "edit"){
      console.log(this.contactData);
      let sendData:Airport = new Airport(this.icao,this.iata,this.name,this.location,this.contactData);
      this.service.editAirport(this.oldAirport.icao,sendData).subscribe(()=>{})
      await sleep(10);
      this.endDialog.emit();
    }
  }

  abortAddAirport(){
    this.icao = "";
    this.iata = "";
    this.name = "";
    this.email= "";
    this.location = "";
    this.newKey = "";
    this.newValue = "";
    this.contactData = {};
    this.acknowledged = false;
    this.addContactMode = false;
  }

  acceptContactData(){
    if(this.newKey.trim() == "" && this.newValue.trim() == ""){
      return;
    }
    if(this.newKey in this.contactData){
      return;
    }
    this.addContactMode = false;
    this.contactData[this.newKey] = this.newValue;
    this.newKey = "";
    this.newValue = "";
    this.refreshSubmitState();
    this.cdr.detectChanges();
  }

  deleteContactData(key:string){
    delete this.contactData[key];
    this.refreshSubmitState();
  }

  compareContactData(ctcData1: { [key: string]: string }, ctcData2: { [key: string]: string }): boolean {
    const keys1 = Object.keys(ctcData1);
    const keys2 = Object.keys(ctcData2);

    if (keys1.length !== keys2.length) {
        return true;
    }

    for (let key of keys1) {
        if (ctcData1[key] !== ctcData2[key]) {
            return true;
        }
    }

    return false;
  }

  deleteAirport(){
    this.service.deleteAirport(this.oldAirport.icao).subscribe(()=>{});
    this.endDialog.emit();
  }
}
