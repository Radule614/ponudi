import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { categoryReducer, CategoryState } from "./category/category.reducer";

export interface AppState {
  auth: AuthState,
  category: CategoryState
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  category: categoryReducer
};