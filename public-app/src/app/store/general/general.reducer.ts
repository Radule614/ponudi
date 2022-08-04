import { createReducer, on } from "@ngrx/store";
import * as GeneralActions from "./general.actions";

export interface GeneralState {
  loading: boolean;
  darkTheme: boolean;
}

const initialState: GeneralState = {
  loading: true,
  darkTheme: localStorage.getItem('darkTheme') == undefined || localStorage.getItem('darkTheme') == 'true'
}

export const generalReducer = createReducer(
  initialState,
  on(GeneralActions.activateLoading,    (state, _)        => ({...state, loading: true })),
  on(GeneralActions.deactivateLoading,  (state, _)        => ({...state, loading: false })),
  on(GeneralActions.setDarkTheme,       (state, payload)  => ({...state, darkTheme: payload.darkTheme }))
);