import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.css']
})
export class MyCompanyComponent implements OnInit{

  data:Company = new Company("",0,{},0);

  constructor(private service:CompanyService){}

  ngOnInit(){
    this.service.getDataCurrent().subscribe((currentCompany:Company)=>{
      this.data = currentCompany;
    })
  }
}
