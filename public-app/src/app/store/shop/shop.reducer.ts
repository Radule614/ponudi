import { createReducer, on } from "@ngrx/store";
import { Shop } from "src/app/model/shop.model";
import * as ShopActions from './shop.actions';


export interface ShopState {
  shops: Shop[];
  errors: string[];
  page: number;
  count: number;
  shop: Shop | null;
  loading: boolean;
}

const initialState: ShopState = {
  shops: [],
  page:-1,
  count: -1,
  shop: null,
  errors: [],
  loading: false
}

export const shopReducer = createReducer(
  initialState,
  on(ShopActions.setAll,            (state, payload)  => ({...state, shops: payload.shops, page: payload.page, count: payload.count })),
  on(ShopActions.setShop,           (state, payload)  => ({...state, shop: payload.shop })),
  on(ShopActions.shopError,         (state, payload)  => ({...state, errors: payload.messages })),
  on(ShopActions.clearErrors,       (state, _)        => ({...state, errors: [] })),
  on(ShopActions.activateLoading,   (state, _)        => ({...state, loading: true })),
  on(ShopActions.deactivateLoading, (state, _)        => ({...state, loading: false }))
);
