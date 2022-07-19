import * as fromAuth from "./auth/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export const rootReducer = {};

export interface AppState {
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: fromAuth.authReducer 
};