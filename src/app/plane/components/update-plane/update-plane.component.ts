import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/company/models/company';
import { CompanyService } from 'src/app/company/services/company.service';
import { Plane } from '../../models/Plane';
import { PlaneService } from '../../services/plane.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-plane',
  templateUrl: './update-plane.component.html',
  styleUrl: './update-plane.component.scss',
  providers:[DialogService]
})
export class UpdatePlaneComponent implements OnInit{
  submitEnabled:boolean = false;

  @Output() onHideTrigger:EventEmitter<any> = new EventEmitter();
  @Input() tailNumber:string="";

  oldData!:Plane;

  registrationNumber:string = "";
  manufacturer:string = "";
  model:string = "";
  manufactureYear:number= 2000;
  range:number = 0;
  cruisingSpeed:number = 0;
  wingspan:number = 0;
  length:number = 0;
  height:number = 0;
  acknowledgment:boolean = true;
  ackCheck:boolean = true;
  ackCheckView:boolean = false;

  companies: Company[] = [];
  selectedCompany: Company|null = null;

  constructor(private companyService:CompanyService, private service:PlaneService){}

  ngOnInit(){
    this.refreshData(this.tailNumber);
  }

  refreshData(tailNumber:string){
    this.service.getOnePlane(tailNumber).subscribe((data:Plane)=>{
      this.oldData=data;
      this.registrationNumber=data.registrationNumber;
      this.manufacturer=data.manufacturer;
      this.manufactureYear=data.manufactureYear;
      this.range=data.range;
      this.cruisingSpeed=data.cruisingSpeed;
      this.wingspan=data.wingspan;
      this.length=data.length;
      this.height=data.height;
      this.model=data.model;
      this.selectedCompany=data.company;
    });
    this.companyService.getDataAdmin().subscribe((data:Company[])=>{
      this.companies = data;
    })
  }

  refreshSaveState(){
    this.submitEnabled = (this.registrationNumber.trim() != "" && this.registrationNumber != this.oldData?.registrationNumber) ||
                         (this.model.trim() != "" && this.model != this.oldData?.model) ||
                         (this.manufactureYear > 1900 && this.manufactureYear <=2030 && this.manufactureYear != this.oldData?.manufactureYear) ||
                         (this.manufacturer.trim() != "" && this.oldData?.manufacturer != this.manufacturer) ||
                         (this.range > 0 && this.range != this.oldData?.range) ||
                         (this.cruisingSpeed > 0 && this.oldData?.cruisingSpeed != this.cruisingSpeed) ||
                         (this.wingspan > 0 && this.oldData?.wingspan != this.wingspan) ||
                         (this.length > 0 && this.oldData?.length != this.length) ||
                         (this.height > 0 && this.oldData?.height != this.height) ||
                         (this.selectedCompany != null && this.oldData?.company != this.selectedCompany);
  }

  submit(){
    if(!this.submitEnabled) return;
    if(this.selectedCompany == null) return; 
    if(this.oldData == null) return;
    let data=new Plane(this.model,
                             this.registrationNumber,
                             this.manufacturer,
                             this.manufactureYear,
                             this.range,
                             this.cruisingSpeed,
                             this.wingspan,
                             this.length,
                             this.height,
                             this.selectedCompany,
                             this.selectedCompany?.name);
    this.service.updatePlane(this.oldData.registrationNumber,data).subscribe();
    this.onHideTrigger.emit();
  }

  delete1(){
    if(!this.ackCheckView){
      this.ackCheckView = true
      this.ackCheck = false;
    }
    if(this.ackCheckView){
      if(this.ackCheck){
        this.delete();
      }
    }
  }

  delete(){
    if(this.oldData == null) return;
    this.service.deletePlane(this.tailNumber).subscribe();
    this.onHideTrigger.emit();
  }
}
