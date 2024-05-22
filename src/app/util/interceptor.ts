import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor{
    constructor(private messageService:MessageService){}

    intercept(request: HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request).pipe(
            catchError((error:HttpErrorResponse)=>{
                this.messageService.add({severity:'error',summary:error.name,detail:error.error,life:10000});
                return throwError(error);
            })
        );
    }
}