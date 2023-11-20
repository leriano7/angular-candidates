import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestAuth } from '../models/request-auth';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../models/user';
import { ResponseAuth } from '../models/response-auth';

const ENDPOINT = "http://ubuntuserver:3000";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login = (credentials : RequestAuth) : Observable<User> => {
    return this.http.post<ResponseAuth>(`${ENDPOINT}/auth/login`,credentials)
      .pipe(
          tap((auth: ResponseAuth) =>
              localStorage.setItem("token",`Bearer ${auth.access_token}`)
          ),
          switchMap((auth: ResponseAuth) =>
              this.http.get<User>(`${ENDPOINT}/api/users/${auth.id}`)
          )
      );
  }

  public logout = () : void => {
    localStorage.clear();
  };

  public isLogged = () : Boolean => {
    // Coherción a booleano
    return !!localStorage.getItem("token");
  }
}
