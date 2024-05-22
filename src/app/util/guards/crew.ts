import { Role } from "src/app/user/models/role";

export class CrewGuard{
    public canActivate(){
        return localStorage.getItem("role") == Role.cr;
    }
}