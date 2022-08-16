import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { GeneralState } from "./general.reducer";

const articleFeature = (state: AppState) => state.general;

export const selectLoading    = createSelector(articleFeature, (state: GeneralState) => state.loading);
export const selectDarkTheme  = createSelector(articleFeature, (state: GeneralState) => state.darkTheme);
export const selectMenuOpen   = createSelector(articleFeature, (state: GeneralState) => state.menuOpen);