import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/model/article.model";

export const fetchAll         = createAction('[Article] Fetch All',           props<{ id: string }>());
export const fetchAllByUser   = createAction('[Article] Fetch All By User');
export const setAll           = createAction('[Article] Set All',             props<{ articles: Article[] }>());

export const fetchArticle     = createAction('[Article] Fetch Article',       props<{ id: string }>());
export const setArticle       = createAction('[Article] Set Article',         props<{ article: Article }>());

export const fetchFailed      = createAction('[Article] Fetch Failed');