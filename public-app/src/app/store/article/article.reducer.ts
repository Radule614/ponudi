import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import * as ArticleActions from './article.actions';

export interface ArticleState {
  articles: Article[];
  page: number;
  count: number;
  article: Article | null;
  errors: string[];
  loading: boolean;
} 

const initialState: ArticleState = {
  articles: [],
  page:-1,
  count: -1,
  article: null,
  errors: [],
  loading: false
}

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.setAll,               (state, payload)  => ({...state, articles: payload.articles, page: payload.page, count: payload.count })),
  on(ArticleActions.setArticle,           (state, payload)  => ({...state, article: payload.article })),
  on(ArticleActions.articleError,         (state, payload)  => ({...state, errors: payload.messages })),
  on(ArticleActions.clearErrors,          (state, _)        => ({...state, errors: [] })),
  on(ArticleActions.activateLoading,      (state, _)        => ({...state, loading: true })),
  on(ArticleActions.deactivateLoading,    (state, _)        => ({...state, loading: false }))
);