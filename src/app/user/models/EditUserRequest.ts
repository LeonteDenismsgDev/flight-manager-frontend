export class EditUserRequest{
    constructor(
        public username:string|null,
        public firstName:string,
        public lastName:string,
        public contactData:{[key:string]:string},
        public address:string,
    ){}
}