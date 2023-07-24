import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {UtilService} from "../service/util.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly utilService: UtilService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      const newBody = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.utilService.currentUser.jwtToken}`,
        },
      });

   /*   let expire =(Math.floor((new Date).getTime() / 1000)) >= JSON.parse(atob(this.utilService.currentUser.jwtToken.split('.')[1])).exp;

      console.log("expire",expire)
      if(expire){

        this.router.navigate(['/login']);
      }*/
      return next.handle(newBody).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {

            /*localStorage.clear();
            sessionStorage.clear();*/
            this.router.navigate(['/login']);
          }

          return throwError(() => error);
        })
      );
    }catch (e){


      /*console.log(e);*/
     /* localStorage.clear();
      sessionStorage.clear();*/
      this.router.navigate(['/login']);
      return next.handle(request);
    }
  }
}
