import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Plane } from '../../models/Plane';
import { PlaneService } from '../../services/plane.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/user/models/role';
import { UpdatePlaneComponent } from '../update-plane/update-plane.component';
import { DataTableComponent } from 'src/app/util-components/components/data-table/data-table.component';
import { UserSecurity } from 'src/app/security/services/user-security';

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
      this.data = []
      this.service.getAllPlanes().subscribe((data:Plane[])=>{
        data.forEach((plane:Plane)=>{plane.companyName = plane.company.name});
        this.data = data;
        this.cdr.detectChanges();
      })
    }
    else{
      this.service.getCompanyPlanes().subscribe((data:Plane[])=>{
        data.forEach((plane:Plane)=>{plane.companyName = plane.company.name});
        this.data = data;
        this.cdr.detectChanges();
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
}
