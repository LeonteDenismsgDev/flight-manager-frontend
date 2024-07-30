import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FlightTemplateService } from '../../services/flight-template.service';
import { FlightTemplateTableResponse } from '../../models/FlightTemplateTableResponse';
import { FlightTemplate } from '../../models/FlightTemplate';
import { REQUIRED_ATTRIBUTES } from '../../models/RequiredAttributes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-template',
  templateUrl: './flight-template.component.html',
  styleUrls: ['./flight-template.component.css']
})
export class FlightTemplateComponent implements OnInit{
  flightTemplateList:FlightTemplate[]=[];
  mondatory_attributes=REQUIRED_ATTRIBUTES;

  page:number = 0;
  size:number = 4;
  max_page:number = 0;

  constructor(private flightTemplateService:FlightTemplateService, private router:Router){}

  ngOnInit(){
    this.refreshTable();
  }

  refreshTable(){
    this.flightTemplateService.getTableData(this.page,this.size).subscribe(
      (result:FlightTemplateTableResponse)=>{
        this.max_page = Math.ceil(result.templatesCount/this.size);
        this.flightTemplateList = result.page;
      });
  }

  removePage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.refreshTable()
  }

  addPage() {
    if(this.page >= this.max_page) return;
    this.page+=1;
     console.log(this.page)
    this.refreshTable();
  }

  goToNewTemplatePage(){
    this.router.navigate(['/home/flightTemplates/create']);
  }

  deleteTemplate(template : FlightTemplate){
    this.flightTemplateService.delteTemplate(template.name).subscribe((reponse) =>{
      this.refreshTable();
    })
  }

  navigateToEdit(templateName: string){
    this.router.navigate(['home/flightTemplates/update', templateName]);
  }

}
