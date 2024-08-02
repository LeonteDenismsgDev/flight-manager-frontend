import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../models/Airport';

@Component({
  selector: 'app-airport-dialog',
  templateUrl: './airport-dialog.component.html',
  styleUrls: ['./airport-dialog.component.css']
})
export class AirportDialogComponent implements OnChanges{

  @Input() data:Airport|null = null
  @Input() mode:string = "save";
  oldAirport:Airport = new Airport("","","","",{});
  submitEnabled:boolean = false;
  icao:string = ""
  iata:string = ""
  name:string = ""
  email:string= ""
  location:string = ""
  contactData:Object = {}
  addContactMode: boolean = false;
  newKey:string = "";
  newValue:string = "";

  constructor(private service:AirportService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data !== null){
      this.icao = this.data.icao;
      this.iata = this.data.iata;
      this.name = this.data.airportName;
      this.location = this.data.location;
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
      this.submitEnabled = this.name.trim() != "" &&
                          this.iata.trim() != "" &&
                          this.icao.trim() != "" &&
                          this.email.trim()!= "" &&
                          this.location.trim() != "";
      if(this.addContactMode){
        this.submitEnabled = this.submitEnabled &&
                            this.newKey.trim() != "" &&
                            this.newValue.trim() != "";
      }
    }
  }

  submit(){
    if(this.mode == "save"){
    let sendData:Airport = new Airport(this.icao,this.iata,this.name,this.location,{"email":this.email});
    this.service.submitAirport(sendData).subscribe(()=>{
      // this.addAirport = false;
    });
    }
    else if(this.mode == "edit"){
      let sendData:Airport = new Airport(this.icao,this.iata,this.name,this.location,this.oldAirport.contactData);
      this.service.editAirport(this.oldAirport.icao,sendData).subscribe(()=>{})
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
    this.addContactMode = false;
  }



  deleteContactData(key:string){
  }
}
