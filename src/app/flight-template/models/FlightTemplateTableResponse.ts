import { FlightTemplate } from "./FlightTemplate";

export class FlightTemplateTableResponse{
    constructor(
        public templatesCount:number,
        public page:FlightTemplate[]
    ){}
}