import { createReducer, on } from "@ngrx/store";
import * as GeneralActions from "./general.actions";

export interface GeneralState {
  loading: boolean;
}

const initialState: GeneralState = {
  loading: false
}

export const generalReducer = createReducer(
  initialState,
  on(GeneralActions.activateLoading, (state, _)   => ({...state, loading: true})),
  on(GeneralActions.deactivateLoading, (state, _) => ({...state, loading: false}))
);