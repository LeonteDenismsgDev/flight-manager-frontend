export class AirportRequest{
    constructor(
        public page:number,
        public size:number,
        public filter:string
    ){
    }
}