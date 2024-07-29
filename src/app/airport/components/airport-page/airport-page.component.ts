import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../models/Airport';

@Component({
  selector: 'app-airport-page',
  templateUrl: './airport-page.component.html',
  styleUrls: ['./airport-page.component.css']
})
export class AirportPageComponent implements OnInit{
  headers=["ICAO Code","IATA Code","Name","Location"];
  keys=["icao","iata","name","location"]
  data:Airport[] = [];
  addAirport:boolean = false;

  submitEnabled:boolean = false;
  icao:string = ""
  iata:string = ""
  name:string = ""
  email:string= ""
  location:string = ""
  page:number = 0;
  max_page:number = 5;
  size:number = 10;
  size_options:number[] = [10,20,30];

  constructor(private service:AirportService){}

  ngOnInit(){
    this.service.getList().subscribe((response:Airport[])=>{
      this.data = response;
    })
  }

  showAddDialog(){
    this.addAirport = true;
  }

  refreshSubmitState(){
    this.submitEnabled = this.name.trim() != "" &&
                        this.iata.trim() != "" &&
                        this.icao.trim() != "" &&
                        this.email.trim()!= "" &&
                        this.location.trim() != "";
  }

  submit(){
    let sendData:Airport = new Airport(this.icao,this.iata,this.name,this.location,{"email":this.email});
    this.service.submitAirport(sendData).subscribe(()=>{
      this.addAirport = false;
    });
  }

  abortAddAirport(){
    this.icao = "";
    this.iata = "";
    this.name = "";
    this.email= "";
    this.location = "";
  }

  addPage(){
    //add max page constraint
    if(this.page >= this.max_page) return;
    this.page+=1;
    this.refreshTable();
  }

  removePage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.refreshTable()
  }

  refreshTable(){
    
  }
}
