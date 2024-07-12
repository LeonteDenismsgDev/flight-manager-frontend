import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { CompanyDataModel } from '../../models/CompanyDataModel';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit{

  data:CompanyDataModel[]=[]
  addCompanyDialog:boolean = false;
  newCompanyName:string="";
  newCompanyEmail:string="";
  saveEnabled:boolean = false;

  constructor(private service:CompanyService, private cdr:ChangeDetectorRef){}

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.data=[];
    this.cdr.detectChanges();
    this.service.getDataAdmin().subscribe((responseData:Company[])=>{
      responseData.forEach((companyData)=>{
        let data_ : CompanyDataModel=new CompanyDataModel("",-1,[],-1);
        data_.name = companyData.name;
        data_.crews = companyData.crews;
        data_.fleet = companyData.fleet;
        Object.keys(companyData.contactData).forEach(key => {
          const value = companyData.contactData[key];
          data_.contactData.push({key,value})
        });
        this.data.push(data_)
      });
      this.cdr.detectChanges();
    });
  }

  createNewCompany(){
    this.service.saveCompany(this.newCompanyName,this.newCompanyEmail).subscribe(
      ()=>{}
    );
    this.addCompanyDialog = false;
        this.newCompanyName = "";
        this.newCompanyEmail = "";
        this.refresh();
  }

  initNewCompany(){
    this.addCompanyDialog=true;
  }

  deleteCompany(company:CompanyDataModel){
    this.service.deleteCompany(company.name).subscribe(
      ()=>{
        this.refresh();
      }
    );
  }

  refreshSaveState(){
    this.saveEnabled =  this.newCompanyName.trim() != "" &&
      this.newCompanyEmail.trim() != "";
  }
}
