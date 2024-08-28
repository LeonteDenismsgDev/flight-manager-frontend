import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { UserSecurity } from "../security/services/user-security";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers:request.headers.set("Authorization", `${UserSecurity.getItem("token")}`??'')
    });
    return next.handle(request);
  }
}