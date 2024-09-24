export class CustomCompanyExportRequest{
    constructor(
        public minFleet:number,
        public maxFleet:number,
        public minCrew:number,
        public maxCrew:number
    ){}
}