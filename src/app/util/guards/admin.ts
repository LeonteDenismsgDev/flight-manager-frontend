import { Role } from "src/app/user/models/role";

export class AdminGuard{
    public canActivate(){
        return localStorage.getItem("role") == Role.ad;
    }
}