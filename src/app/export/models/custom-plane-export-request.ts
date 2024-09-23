export class CustomPlaneExportRequest{
    constructor(
        public manufacturer:string,
        public model:string,
        public minYear:number,
        public maxYear:number,
        public company:string
    ){}
}