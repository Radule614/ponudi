import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ArticleState } from "./article.reducer";

const articleFeature = (state: AppState) => state.article;

export const selectAll = createSelector(
  articleFeature,
  (state: ArticleState) => ({
    articles: state.articles,
    count: state.count,
    page: state.page
  })
);

export const selectArticle = createSelector(
  articleFeature,
  (state: ArticleState) => state.article
);

export const selectErrors = createSelector(
  articleFeature,
  (state: ArticleState) => state.errors
);

export const selectLoading = createSelector(
  articleFeature,
  (state: ArticleState) => state.loading
);

export const selectImages = createSelector(
  articleFeature,
  (state: ArticleState) => {
    const article = state.article;
    return article && article.pictures ? article.pictures.map(picture => ({ url: picture })) : [];
  }
);