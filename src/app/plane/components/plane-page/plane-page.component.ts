import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Plane } from '../../models/Plane';
import { PlaneService } from '../../services/plane.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/user/models/role';
import { UpdatePlaneComponent } from '../update-plane/update-plane.component';
import { DataTableComponent } from 'src/app/util-components/components/data-table/data-table.component';
import { UserSecurity } from 'src/app/security/services/user-security';
import { PlaneRequest } from '../../models/PlaneRequest';
import { PlaneResponse } from '../../models/PlaneResponse';

async function sleep(ms:number){
  return new Promise((resolve)=>{setTimeout(resolve,ms)});
}
@Component({
  selector: 'app-plane-page',
  templateUrl: './plane-page.component.html',
  styleUrls: ['./plane-page.component.scss']
})
export class PlanePageComponent implements OnInit{

  @ViewChild('updateDialog') child!:UpdatePlaneComponent;
  @ViewChild('planeTable') tableChild!:DataTableComponent;
  
  data:Plane[] = [];
  headers:string[]=["Tail Number","Manufacturer","Model","Manufacture Year", "Company"];
  keys: string[]=["registrationNumber","manufacturer","model","manufactureYear","companyName"];

  size:number = 10;
  page:number = 0;
  filter:string = "";

  size_options=[10,20,30];
  max_page:number = 0;
  max_planes:number = 0;

  updatePlane:boolean = false;
  selectedPlane!:Plane; 

  constructor(private service:PlaneService, private router:Router, private cdr:ChangeDetectorRef){}
  
  ngOnInit(){
      this.refreshTable();
  }

  isAdmin(){
    return UserSecurity.getItem("role") == Role.ad;
  }

  refreshTable(){
    if(this.isAdmin()){
      let request = new PlaneRequest(this.page,this.size,this.filter);
      this.data = []
      this.service.getAllPlanesFiltered(request).subscribe((data:PlaneResponse)=>{
        data.page.forEach((plane:Plane)=>{plane.companyName = plane.company.name});
        this.data = data.page;
        this.max_planes = data.max_planes;
        this.max_page = Math.ceil(data.max_planes/((this.page+1)*this.size))
        if(this.max_planes <=  this.size){
          this.max_page = 0;
        }
      })
    }
    else{
      let request = new PlaneRequest(this.page,this.size,this.filter);
      this.data = []
      this.service.getCompanyPlanesFiltered(request).subscribe((data:PlaneResponse)=>{
        data.page.forEach((plane:Plane)=>{plane.companyName = plane.company.name});
        this.data = data.page;
        this.max_planes = data.max_planes;
        this.max_page = Math.ceil(data.max_planes/((this.page+1)*this.size))
        if(this.max_planes <=  this.size){
          this.max_page = 0;
        }
      })
    }
  }

  redirectToCreatePlane(){
    if(this.isAdmin())
      this.router.navigate(["/home/planes/createAdmin"]);
    else
      this.router.navigate(['/home/planes/create']);
  }

  redirectToUpdatePlane(data:Plane){
    if(data == null) return;
    this.selectedPlane = data;
    this.updatePlane = true;
  }

  abortUpdate(){
    this.updatePlane = false;
    this.tableChild.autoDeselect();
  }

  addPage(){
    if(this.page >= this.max_page) return;
    this.page++;
    this.refreshTable();
  }

  removePage(){
    if(this.page == 0) return;
    this.page--;
    this.refreshTable();
  }

  changePaginator(){
    this.page = 0;
    this.refreshTable();
  }

  changeFilter(){
    this.page = 0;
    this.refreshTable();
  }
}
