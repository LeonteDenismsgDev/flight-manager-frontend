import { Attribute } from "./Attribute";

export class FlightTemplate{
    constructor(
        public name:string,
        public attributes:Attribute[],
        public validators:Object[]
    ){}
}