import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ArticleState } from "./article.reducer";

const articleFeature = (state: AppState) => state.article;

export const selectAll = createSelector(
  articleFeature,
  (state: ArticleState) => state.articles
);

export const selectArticle = createSelector(
  articleFeature,
  (state: ArticleState) => state.article
);

export const selectAllByUser = createSelector(
  articleFeature,
  (state: ArticleState) => state.userArticles
);

export const selectErrors = createSelector(
  articleFeature,
  (state: ArticleState) => state.errors
);