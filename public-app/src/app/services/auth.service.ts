import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable, of, take, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AppState } from "../store";
import { isLogged } from "../store/auth/auth.selectors";

export interface loginDTO {
  username: string;
  password: string;
}

export interface registerDTO {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  gender: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private http: HttpClient, private store: Store<AppState>){}

  loginUser(data: loginDTO): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  fetchUserData(): Observable<any>{
    return this.store.select(isLogged).pipe(
      take(1),
      exhaustMap(userLogged => {
        if(userLogged){
          return this.http.get(`${environment.apiUrl}/users/me`);
        }
        return throwError(() => new Error('user not logged'));
      })
    )
  }

  registerUser(data: registerDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }
}