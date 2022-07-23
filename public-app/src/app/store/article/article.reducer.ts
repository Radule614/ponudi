import { createReducer, on } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import * as ArticleActions from './article.actions';

export interface ArticleState {
  articles: Article[];
} 

const initialState: ArticleState = {
  articles: []
}

export const articleReducer = createReducer(
  initialState,
  on(ArticleActions.setAll, (state, payload) => ({...state, articles: payload.articles}))
);