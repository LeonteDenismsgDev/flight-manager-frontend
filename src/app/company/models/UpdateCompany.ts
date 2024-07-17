export class UpdateCompany{
    constructor(
        public name:string,
        public contactData:{
            [key:string]:string
        }
    ){}
}