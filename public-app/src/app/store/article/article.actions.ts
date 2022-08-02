import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/model/article.model";

export const fetchAll             = createAction('[Article] Fetch All',               props<{ id: string, page: number }>());
export const fetchAllByUser       = createAction('[Article] Fetch All By User',       props<{ userId: string, page: number }>());
export const setAll               = createAction('[Article] Set All',                 props<{ articles: Article[], page: number, count: number }>());

export const fetchArticle         = createAction('[Article] Fetch Article',           props<{ id: string }>());
export const setArticle           = createAction('[Article] Set Article',             props<{ article: Article }>());
export const fetchFailed          = createAction('[Article] Fetch Failed');

export const createArticle        = createAction('[Article] Create Article',          props<{ article: Article }>());
export const createArticleSuccess = createAction('[Article] Create Article Success');
export const createArticleFailed  = createAction('[Article] Create Article Failed',   props<{ messages: string[] }>());
export const clearErrors          = createAction('[Article] Clear Errors');