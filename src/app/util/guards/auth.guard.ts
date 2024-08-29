import { CanActivateFn } from '@angular/router';
import { UserSecurity } from 'src/app/security/services/user-security';

export const authGuard: CanActivateFn = (route, state) => {
  //update UserSecurity call here: 
  return UserSecurity.getItem("token") != "" &&
          UserSecurity.getItem("username") != "" &&
          UserSecurity.getItem("role") != "";
};
