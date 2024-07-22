export class Company{
    constructor(
        public name:string,
        public fleet:number,
        public contactData:{
            [key:string]:string
        },
        public crews:number
    ){}
}