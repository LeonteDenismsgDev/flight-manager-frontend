export class CompanyDataModel{
    constructor(
        public name:string,
        public fleet:number,
        public contactData:{
            key:string,
            value:string
        }[],
        public crews:number
    ){}
}