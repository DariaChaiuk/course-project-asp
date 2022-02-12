import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { InformService } from '../services/inform.service';

@Injectable()
export class HttpReponseHandler implements HttpInterceptor {
    constructor(public infoService: InformService) {}
intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)  => {
                if(error.status == 401){
                    console.log('hello',error);
                    window.localStorage.clear();
                    window.location.href = "/.login"
                }
                if(error.error?.error){
                    this.infoService.setInfo(error.error.error);
                }
                else if (error?.error?.errors) {
                    for (const prop of Object.keys(error?.error?.errors)) {
                      error?.error?.errors[prop].forEach((value: string) => {
                        this.infoService.setInfo(value);
                      });
                    }
                }
                else if(error){
                    this.infoService.setInfo(error.error);
                }
                
                return throwError(error);
            }),
        )
    }
}