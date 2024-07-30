import { Attribute } from "./Attribute";

export class FlightTemplate{
    constructor(
        public name:string,
        public attributes:Attribute[],
        public validations:Object[]
    ){}
}

export class UpdateFlightTemplate{
    constructor(
        public oldName:string,
        public newName:string,
        public createdBy:string,
        public newAttributes: Attribute[],
        public newValidations: Object[]
    ){}
}