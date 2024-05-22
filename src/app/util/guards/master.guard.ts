import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { CompanyManagerGuard } from "./companyManager";
import { AdminGuard } from "./admin";
import { CrewGuard } from "./crew";
import { FlightManagerGuard } from "./flightManager";


export const masterGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    
  type GuardKey = 'ADMINISTRATOR_ROLE' | 'CREW_ROLE' | 'COMPANY_MANAGER_ROLE' | 'FLIGHT_MANAGER_ROLE';
  const activeGuards = route.data['activeGuards'] as GuardKey[];

  const adminGuard = new AdminGuard();
  const crewGuard = new CrewGuard();
  const companyManagerGuard = new CompanyManagerGuard();
  const flightManagerGuard = new FlightManagerGuard();

  const guardMap: { [key in GuardKey]: () => boolean } = {
    'ADMINISTRATOR_ROLE': () => adminGuard.canActivate(),
    'CREW_ROLE': () => crewGuard.canActivate(),
    'COMPANY_MANAGER_ROLE': () => companyManagerGuard.canActivate(),
    'FLIGHT_MANAGER_ROLE': () => flightManagerGuard.canActivate(),
  };

  return activeGuards?.some(guard=>guardMap[guard]?.());
}