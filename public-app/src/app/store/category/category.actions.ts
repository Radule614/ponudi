import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category.model";

export const fetchAll       = createAction('[Category] Fetch All');
export const setAll         = createAction('[Category] Set All', props<{categories: Category[]}>());
export const fetchAllFailed = createAction('[Category] Fetch All Failed');