import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import * as ArticleActions from './article.actions';

export interface ArticleState {
  articles: Article[];
  article: Article | null;
  userArticles: Article[];
  errors: string[];
} 

const initialState: ArticleState = {
  articles: [],
  article: null,
  userArticles: [],
  errors: []
}

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.setAll,               (state, payload)  => ({...state, articles: payload.articles })),
  on(ArticleActions.setAllByUser,         (state, payload)  => ({...state, userArticles: payload.articles })),
  on(ArticleActions.setArticle,           (state, payload)  => ({...state, article: payload.article })),
  on(ArticleActions.createArticleFailed,  (state, payload)  => ({...state, errors: payload.messages })),
  on(ArticleActions.clearErrors,          (state, _)        => ({...state, errors: [] })),

);