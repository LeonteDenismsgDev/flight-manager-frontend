export class UserDataResponse{
    constructor(
        public username:string,
        public firstName:string,
        public lastName:string,
        public address:string,
        public company:string,
        public role:string,
        public enabled:boolean,
        public contactData:{
            [key:string]:string
        }
    ){}
}