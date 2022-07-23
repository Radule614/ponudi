import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { CategoryState } from "./category.reducer";

const categoryFeature = (state: AppState) => state.category;

export const selectAll = createSelector(
  categoryFeature,
  (state: CategoryState) => state.categories
);