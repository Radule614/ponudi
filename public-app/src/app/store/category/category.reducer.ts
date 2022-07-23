import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/model/category.model";
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: []
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.setAll,      (state, payload)  => ({ ...state, categories: payload.categories })),
);