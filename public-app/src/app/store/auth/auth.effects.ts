import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import User from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        console.log(action);
        this.authService.loginUser({username: action.username, password: action.password});
        return of(AuthActions.setUser({user: new User(action.username)}));
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService){}
}