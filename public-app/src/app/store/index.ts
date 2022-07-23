import { ActionReducerMap } from "@ngrx/store";
import { ArticleEffects } from "./article/article.effects";
import { articleReducer, ArticleState } from "./article/article.reducer";
import { AuthEffects } from "./auth/auth.effects";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { CategoryEffects } from "./category/category.effects";
import { categoryReducer, CategoryState } from "./category/category.reducer";

export interface AppState {
  auth: AuthState,
  category: CategoryState,
  article: ArticleState
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  category: categoryReducer,
  article: articleReducer
};

export const effects = [AuthEffects, CategoryEffects, ArticleEffects]