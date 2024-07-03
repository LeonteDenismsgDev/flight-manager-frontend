export class DialogData{
    constructor(
        public username:string,
        public firstName:string,
        public lastName:string,
        public address:string,
        public company:string,
        public role:string,
        public contactData:{
            key:string,
            value:string
        }[],
        public enabled:boolean,
    ){}
}