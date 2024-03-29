import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { AppState } from "..";
import * as CategoryActions from './category.actions';
import * as GeneralActions from '../general/general.actions';

@Injectable()
export class CategoryEffects {
  fetchAll = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.fetchAll),
    switchMap(_ => {
      return this.categoryService.fetchCategories().pipe(
        map(data => {
          return CategoryActions.setAll({categories: data});
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(CategoryActions.fetchAllFailed());
        })
      )
    })
  ));
  createCategory = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.createCategory),
    switchMap(action => {
      return this.categoryService.createCategory(action.category).pipe(
        map(_ => {
          this.router.navigate(['/admin']);
          this.store.dispatch(GeneralActions.deactivateLoading());
          return CategoryActions.fetchAll();
        }),
        catchError(error => {
          console.log(error.error.message);
          this.store.dispatch(GeneralActions.deactivateLoading());
          return of(CategoryActions.createCategoryFailed(error.error.message));
        })
      )
    })
  ));

  constructor(private actions$: Actions, private categoryService: CategoryService, private router: Router, private store: Store<AppState>) {}
}