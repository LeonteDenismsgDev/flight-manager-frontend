import { Role } from "src/app/user/models/role";

export class CompanyManagerGuard{
    public canActivate(){
        return localStorage.getItem("role") === Role.cm;
    }
}