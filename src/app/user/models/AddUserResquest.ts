export class AddUserRequest{
    constructor(
        public firstName:string,
        public lastName:string,
        public contactData:{[key:string]:string},
        public address:string,
        public company:string,
        public role:string,
    ){}
}