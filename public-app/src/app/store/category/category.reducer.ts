import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/model/category.model";
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: Category[];
  errors: string[];
}

const initialState: CategoryState = {
  categories: [],
  errors: []
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.setAll,                (state, payload)  => ({...state, categories: payload.categories })),
  on(CategoryActions.createCategoryFailed,  (state, payload)  => ({...state, errors: payload.messages })),
  on(CategoryActions.clearErrors,           (state, _)        => ({...state, errors: [] }))
);