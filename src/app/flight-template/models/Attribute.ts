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

export class ViewAttributes{
    constructor(
        public id:string,
        public label:string,
        public name:string,
        public required:boolean,
        public type:string,
        public defaultValue:Object,
        public searchKeyWords:string[],
        public description:string,
        public editable:boolean,
        public globalVisibility:boolean
    ){}
}

export class RegisterAttribute{
    constructor(
        public name:string,
        public isGlobal:boolean,
        public isRequired:boolean,
        public type:string,
        public defaultValue:Object,
        public description:string,
    ){}
}