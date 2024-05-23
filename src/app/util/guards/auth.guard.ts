import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //update localStorage call here: 
  return localStorage.getItem("token") != "" &&
          localStorage.getItem("username") != "" &&
          localStorage.getItem("role") != "";
};
