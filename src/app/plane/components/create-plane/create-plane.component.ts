import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company/models/company';
import { CompanyDataModel } from 'src/app/company/models/CompanyDataModel';
import { CompanyService } from 'src/app/company/services/company.service';
import { PlaneService } from '../../services/plane.service';
import { Plane } from '../../models/Plane';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.scss']
})
export class CreatePlaneComponent implements OnInit{
  index:any = 3;
  generalCompleted:boolean = false;
  technicalCompleted:boolean = false;
  companyCompleted:boolean = false;
  submitEnabled:boolean = this.generalCompleted && this.technicalCompleted && this.companyCompleted;

  registrationNumber:string = "";
  manufacturer:string = "";
  model:string = "";
  manufactureYear:number= 2000;
  range:number = 0;
  cruisingSpeed:number = 0;
  wingspan:number = 0;
  length:number = 0;
  height:number = 0;

  companies: Company[] = [];
  selectedCompany: Company|null = null;

  constructor(private companyService:CompanyService, private service:PlaneService, private router:Router){}



  ngOnInit(): void {
      this.companyService.getDataAdmin().subscribe((data:Company[])=>{
        this.companies = data;
        // this.selectedCompany = this.companies[0];
        console.log(this.companies)
      })
  }

  updateGeneralState(){
    this.generalCompleted = this.registrationNumber.trim() != "" &&
                            this.manufacturer.trim() != "" &&
                            this.model.trim() != "" &&
                            this.manufactureYear != null &&
                            this.manufactureYear >= 1900 &&
                            this.manufactureYear <= 2030;
  }

  updateTechnicalState(){
    this.technicalCompleted = this.range > 0 &&
                              this.wingspan > 0 &&
                              this.cruisingSpeed > 0 &&
                              this.length > 0 &&
                              this.height > 0;
  }

  updateCompanyState(){
    this.companyCompleted = this.selectedCompany != null;
    this.submitEnabled = this.generalCompleted &&
                          this.technicalCompleted &&
                          this.companyCompleted;
  }

  submit(){
    if(!this.submitEnabled) return;
    if(this.selectedCompany == null) return; 
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
    this.service.addPlane(data).subscribe();
    this.router.navigate(['/home/planes'])
  }

}
