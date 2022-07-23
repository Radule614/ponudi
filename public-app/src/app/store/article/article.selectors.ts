import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ArticleState } from "./article.reducer";

const articleFeature = (state: AppState) => state.article;

export const selectAll = createSelector(
  articleFeature,
  (state: ArticleState) => state.articles
);