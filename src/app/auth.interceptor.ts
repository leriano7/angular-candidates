import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { APP_CONFIG, AppConfig } from 'src/config/app.config';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

let ENDPOINT: string;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
    private userService : UserService, private router: Router) {
        ENDPOINT = this.config.ENDPOINT;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Pre request
    if (this.needAuth(request.url, request.method)) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token ? this.token : ""
        }
      });
    }
    // Post request
    return next.handle(request).pipe(catchError((error) => {
      if (error.status === 401 && error.error.data === 'Token expired') {
        // Here we write errors to give them to upper components. No used so far...
        error.error.infodata='TOKEN_EXPIRED-401';
      } else if(error.status === 404) {
        error.error.infodata='NOT_FOUND-404';
      }
      // This should be done in component...
      this.userService.logout();
      this.router.navigate(['/']);
      throw error;
    }));
  }

  get token() {
    return this.userService.getToken();
  }

  private needAuth(url: string, method: string): Boolean {
    /*
    {ENDPOINT}/api/users/{id} -> If POST - PUT - DELETE -> Needs Bearer
    {ENDPOINT}/api/candidates/{id} -> If POST - PUT - DELETE -> Needs Bearer
    {ENDPOINT}/auth/login
    {ENDPOINT}/auth/reset
    {ENDPOINT}/auth/recover
    */
    const needUrl = url.includes(`${ENDPOINT}/api`);
    const needMethod = method !== "GET";
    const value = needUrl && needMethod;
    return value;
  }
}
