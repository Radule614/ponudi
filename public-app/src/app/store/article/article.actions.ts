import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/model/article.model";

export const fetchAll       = createAction('[Article] Fetch All',         props<{id: string}>());
export const setAll         = createAction('[Article] Set All',           props<{articles: Article[]}>());
export const fetchAllFailed = createAction('[Article] Fetch All Failed');