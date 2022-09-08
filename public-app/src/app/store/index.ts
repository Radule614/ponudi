import { ActionReducerMap } from "@ngrx/store";
import { ArticleEffects } from "./article/article.effects";
import { articleReducer, ArticleState } from "./article/article.reducer";
import { AuthEffects } from "./auth/auth.effects";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { CategoryEffects } from "./category/category.effects";
import { categoryReducer, CategoryState } from "./category/category.reducer";
import { GeneralEffects } from "./general/general.effects";
import { generalReducer, GeneralState } from "./general/general.reducer";
import { ShopEffects } from "./shop/shop.effects";
import { shopReducer, ShopState } from "./shop/shop.reducer";

export interface AppState {
  general: GeneralState,
  auth: AuthState,
  category: CategoryState,
  article: ArticleState,
  shop: ShopState
}

export const reducers: ActionReducerMap<AppState, any> = {
  general: generalReducer,
  auth: authReducer,
  category: categoryReducer,
  article: articleReducer,
  shop: shopReducer
};

export const effects = [GeneralEffects, AuthEffects, CategoryEffects, ArticleEffects, ShopEffects]