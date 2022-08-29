import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/model/article.model";

export const fetchAll           = createAction('[Article] Fetch All',               props<{ id: string, page: number, filterParams?: Object }>());
export const fetchAllByUser     = createAction('[Article] Fetch All By User',       props<{ userId: string, page: number }>());
export const setAll             = createAction('[Article] Set All',                 props<{ articles: Article[], page: number, count: number }>());

export const fetchArticle       = createAction('[Article] Fetch Article',           props<{ id: string }>());
export const setArticle         = createAction('[Article] Set Article',             props<{ article: Article }>());
export const fetchFailed        = createAction('[Article] Fetch Failed');

export const createArticle      = createAction('[Article] Create Article',          props<{ article: Article, images?: File[] }>());
export const editArticle        = createAction('[Article] Edit Article',            props<{ id: string, article: Article, images?: File[] }>());
export const deleteArticle      = createAction('[Article] Delete Article',          props<{ id: string, userId: string }>());

export const articleSuccess     = createAction('[Article] Article Success');
export const articleError       = createAction('[Article] Article Error',           props<{ messages: string[] }>());
export const clearErrors        = createAction('[Article] Clear Errors');

export const deleteSuccess      = createAction('[Article] Delete Success',          props<{ id: string, userId: string, }>());

export const activateLoading    = createAction('[Article] Activate Loading');
export const deactivateLoading  = createAction('[Article] Deactivate Loading');

export const uploadImages       = createAction('[Article] Upload Image',            props<{ id: string, images: File[] }>());