import { UserSecurity } from "src/app/security/services/user-security";
import { Role } from "src/app/user/models/role";

export class FlightManagerGuard{
    public canActivate(){
        return UserSecurity.getItem("role") === Role.fm;
    }
}