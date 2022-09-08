import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ShopState } from "./shop.reducer";

const shopFeature = (state: AppState) => state.shop;

export const selectAll = createSelector(
  shopFeature,
  (state: ShopState) => ({
    shops: state.shops,
    count: state.count,
    page: state.page
  })
);

export const selectShop = createSelector(
  shopFeature,
  (state: ShopState) => state.shop
);

export const selectErrors = createSelector(
  shopFeature,
  (state: ShopState) => state.errors
);

export const selectLoading = createSelector(
  shopFeature,
  (state: ShopState) => state.loading
);