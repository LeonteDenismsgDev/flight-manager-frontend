export class Airport{
    constructor(
        public icao:string,
        public iata:string,
        public name:string,
        public location:string,
        public contactData:Object
    ){}
}