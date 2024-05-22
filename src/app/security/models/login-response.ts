import { Role } from "src/app/user/models/role";

export class LoginResponse{
    constructor(
        public token:string,
        public username:string,
        public role:Role
    ){}
}