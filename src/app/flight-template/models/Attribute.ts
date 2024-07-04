export class Attribute{
    constructor(
        public name:string,
        public label:string,
        public required:boolean,
        public type:string,
        public defaultValue:Object,
        public description:string,
    ){}
}