import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import * as CategoryActions from './category.actions';

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

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}