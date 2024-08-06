import { Component, OnInit } from '@angular/core';
import { Plane } from '../../models/Plane';
import { PlaneService } from '../../services/plane.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plane-page',
  templateUrl: './plane-page.component.html',
  styleUrls: ['./plane-page.component.scss']
})
export class PlanePageComponent implements OnInit{
  data:Plane[] = [];
  headers:string[]=["Tail Number","Manufacturer","Model","Manufacture Year", "Company"];
  keys: string[]=["registrationNumber","manufacturer","model","manufactureYear","companyName"];

  constructor(private service:PlaneService, private router:Router){}

  ngOnInit(){
      this.refreshTable();
  }

  refreshTable(){
      this.service.getAllPlanes().subscribe((data:Plane[])=>{
        data.forEach((plane:Plane)=>{plane.companyName = plane.company.name});
        this.data = data;
      })
  }

  redirectToCreatePlane(){
    this.router.navigate(["/home/planes/create"]);
  }
}
