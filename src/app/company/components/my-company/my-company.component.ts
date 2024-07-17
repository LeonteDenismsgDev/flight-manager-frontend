import { Component, OnInit } from '@angular/core';
import { CompanyDataModel } from '../../models/CompanyDataModel';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css']
})
export class MyCompanyComponent implements OnInit{
  data:CompanyDataModel=new CompanyDataModel("",0,[],0);

constructor(private service:CompanyService){
}

  ngOnInit() {
    this.service.getDataCurrent().subscribe((currentCompany:Company)=>{
      this.data.name=currentCompany.name;
      this.data.crews=currentCompany.crews;
      this.data.fleet=currentCompany.fleet;
      this.data.contactData = [];
      Object.keys(currentCompany.contactData).forEach(key => {
        const value = currentCompany.contactData[key];
        this.data.contactData.push({key,value})
      });
    })
  }
}
