import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers:request.headers.set("Authorization", `${localStorage.getItem("token")}`??'')
    });
    return next.handle(request);
  }
}