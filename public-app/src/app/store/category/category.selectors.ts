import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { CategoryState } from "./category.reducer";

export const selectCategory = (state: AppState) => state.category;

export const selectAll = createSelector(
  selectCategory,
  (state: CategoryState) => state.categories
);