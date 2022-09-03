import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, switchMap, catchError, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(action => {
      let data = { username: action.username, password: action.password };
      return this.authService.loginUser(data).pipe(
        map(data => {
          return AuthActions.loginSuccess({ token: data.token });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(AuthActions.loginFailed({ message: error.error.message }));
        })
      );
    })
  )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map((action) => {
      localStorage.setItem("token", action.token);
      return AuthActions.fetchUser();
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(_ => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  fetchUserData$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.fetchUser),
    switchMap(() => {
      return this.authService.fetchUserData().pipe(
        map(data => {
          return AuthActions.fetchUserSuccess({ user: data });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(AuthActions.fetchUserFailed());
        })
      );
    })
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    switchMap(action => {
      return this.authService.registerUser(action.userData).pipe(
        map(data => {
          return AuthActions.registerSuccess({ username: action.userData.username, password: action.userData.password });
        }),
        catchError(error => {
          console.log(error);
          let payload = error.error.message;
          if (!Array.isArray(payload)) payload = [payload];
          return of(AuthActions.registerFailed({ messages: payload }));
        })
      );
    })
  ));

  registerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerSuccess),
    map(action => {
      return AuthActions.login(action);
    })
  ));

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }
}