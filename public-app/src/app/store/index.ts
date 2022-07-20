import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "./auth/auth.reducer";

export const rootReducer = {};

export interface AppState {
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer 
};