import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'src/config/app.config';

let ENDPOINT : string;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    ENDPOINT = this.config.ENDPOINT;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.needAuth(request.url, request.method)) {
      request = request.clone({
        setHeaders : {
          Authorization : this.token ? this.token : ""
        }
      });
    }
    return next.handle(request).pipe(catchError((error)=>{throw error}));
  }

  get token() {
    return localStorage.getItem("token");
  }

  private needAuth(url: string, method: string) : Boolean {
    /*
    {ENDPOINT}/api/users/{id} -> If POST - PUT - DELETE -> Needs Bearer
    {ENDPOINT}/api/candidates/{id} -> If POST - PUT - DELETE -> Needs Bearer
    {ENDPOINT}/auth/login
    {ENDPOINT}/auth/reset
    {ENDPOINT}/auth/recover
    */
    const needUrl = url.includes(`${ENDPOINT}/api`);
    const needMethod = method !== "GET";
    return needUrl && needMethod;
  }
}
