import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, finalize, map, of, switchMap, tap } from "rxjs";
import { ShopService } from "src/app/services/shop.service";
import { AppState } from "..";
import * as ShopActions from './shop.actions';
import * as GeneralActions from '../general/general.actions';

@Injectable()
export class ShopEffects {
  fetchAll = createEffect(() => this.actions$.pipe(
    ofType(ShopActions.fetchAll),
    switchMap(action => {
      return this.shopService.fetchShops(action.page).pipe(
        map(data => {
          console.log(data);
          return ShopActions.setAll({ shops: data, page: -1, count: -1 });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ShopActions.fetchFailed());
        }),
        finalize(() => this.store.dispatch(ShopActions.deactivateLoading()))
      )
    })
  ));

  createShop = createEffect(() => this.actions$.pipe(
    ofType(ShopActions.createShop),
    switchMap(action => {
      return this.shopService.postShop(action.shop).pipe(
        map(response => {
          console.log(response);
          return ShopActions.shopSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ShopActions.shopError({ messages: [error.error.message] }));
        })
      )
    })
  ));

  editShop = createEffect(() => this.actions$.pipe(
    ofType(ShopActions.editShop),
    switchMap(action => {
      return this.shopService.patchShop(action.id, action.shop).pipe(
        map(response => {
          return ShopActions.shopSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ShopActions.shopError({ messages: [error.error.message] }));
        })
      )
    })
  ));

  shopError$ = createEffect(() => this.actions$.pipe(
    ofType(ShopActions.shopError),
    tap(_ => this.store.dispatch(GeneralActions.deactivateLoading()))
  ), { dispatch: false });

  shopSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ShopActions.shopSuccess),
    tap(_ => {
      this.store.dispatch(GeneralActions.deactivateLoading());
      this.router.navigate(['/dashboard']);
    })
  ), { dispatch: false });

  constructor(private actions$: Actions,
              private shopService: ShopService,
              private router: Router,
              private store: Store<AppState>,
              private route: ActivatedRoute) { }
}