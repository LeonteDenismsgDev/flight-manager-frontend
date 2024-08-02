export class Airport{
    constructor(
        public icao:string,
        public iata:string,
        public airportName:string,
        public location:string,
        public contactData:{
            [key:string]:string
        }
    ){}
}