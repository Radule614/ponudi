import { createReducer, on } from "@ngrx/store";
import * as GeneralActions from "./general.actions";

export interface GeneralState {
  loading: boolean;
  darkTheme: boolean;
  menuOpen: boolean;
}

const initialState: GeneralState = {
  loading: true,
  darkTheme: localStorage.getItem('darkTheme') == undefined || localStorage.getItem('darkTheme') == 'true',
  menuOpen: localStorage.getItem('menuOpen') == undefined || localStorage.getItem('menuOpen') == 'true'
}

export const generalReducer = createReducer(
  initialState,
  on(GeneralActions.activateLoading,    (state, _)        => ({...state, loading: true })),
  on(GeneralActions.deactivateLoading,  (state, _)        => ({...state, loading: false })),
  on(GeneralActions.setDarkTheme,       (state, payload)  => ({...state, darkTheme: payload.darkTheme })),
  on(GeneralActions.setMenu,            (state, payload)  => ({...state, menuOpen: payload.menuOpen}))
);