import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestAuth } from '../models/request-auth';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../models/user';
import { ResponseAuth } from '../models/response-auth';
import { APP_CONFIG, AppConfig } from 'src/config/app.config';

let ENDPOINT: string;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    ENDPOINT = this.config.ENDPOINT;
  }

  public login = (credentials: RequestAuth): Observable<User> => {
    return this.http.post<ResponseAuth>(`${ENDPOINT}/auth/login`, credentials)
      .pipe(
        tap((auth: ResponseAuth) =>
          localStorage.setItem("token", `Bearer ${auth.access_token}`)
        ),
        switchMap((auth: ResponseAuth) =>
          this.http.get<User>(`${ENDPOINT}/api/users/${auth.id}`)
        )
      );
  }

  public logout = (): void => {
    localStorage.removeItem('token');
  };

  public isLogged = (): Boolean => {
    return !!localStorage.getItem('token');
  }

  public getToken = () : string | null => {
    if(!!localStorage.getItem('token')) return localStorage.getItem('token');
    else return null;
  }
}
