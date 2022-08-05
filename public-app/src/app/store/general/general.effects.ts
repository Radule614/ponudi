import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CategoryService } from "src/app/services/category.service";
import { AppState } from "..";
import * as GeneralActions from './general.actions';
import * as AuthActions from '../auth/auth.actions';
import * as CategoryActions from '../category/category.actions';

@Injectable()
export class GeneralEffects {
  loadApp = createEffect(() => this.actions$.pipe(
    ofType(GeneralActions.loadApp),
    switchMap(_ => {
      const userData$ = this.authService.fetchUserData().pipe(
        map(data => {
          this.store.dispatch(AuthActions.fetchUserSuccess({user: data}));
          return data;
        }),
        catchError(error => {
          if(error.error){
            console.log(error.error.message);
            return of(error.error.message);
          }else{
            console.log(error);
            return of(error);
          }
        })
      );
      const categoryData$ = this.categoryService.fetchCategories().pipe(
        map(data => {
          this.store.dispatch(CategoryActions.setAll({categories: data}));
          return data;
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(CategoryActions.fetchAllFailed());
        })
      )
      return forkJoin([userData$, categoryData$]).pipe(
        switchMap(([_, __]) => {
          return of(GeneralActions.deactivateLoading());
        })
      )
    })
  ));
  constructor(private actions$: Actions, private authService: AuthService, private categoryService: CategoryService, private store: Store<AppState>){}
}