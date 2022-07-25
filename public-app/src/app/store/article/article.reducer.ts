import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import * as ArticleActions from './article.actions';

export interface ArticleState {
  articles: Article[];
  article: Article | null;
} 

const initialState: ArticleState = {
  articles: [],
  article: null
}

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.setAll, (state, payload) => ({...state, articles: payload.articles })),
  on(ArticleActions.setArticle, (state, payload) => ({...state, article: payload.article }))
);