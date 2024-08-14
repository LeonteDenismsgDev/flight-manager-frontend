import { Company } from "src/app/company/models/company";
import { CompanyDataModel } from "src/app/company/models/CompanyDataModel";

export class Plane{
    constructor(
        public model:string,
        public registrationNumber:string,
        public manufacturer:string,
        public manufactureYear:number,
        public range:number,
        public cruisingSpeed:number,
        public wingspan:number,
        public length:number,
        public height:number,
        public company:Company,
        public companyName:string
    ){}
}