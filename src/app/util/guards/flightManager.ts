import { Role } from "src/app/user/models/role";

export class FlightManagerGuard{
    public canActivate(){
        return localStorage.getItem("role") == Role.fm;
    }
}