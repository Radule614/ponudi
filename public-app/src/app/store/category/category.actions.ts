import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category.model";

export const fetchAll       = createAction('[Category] Fetch All');
export const setAll         = createAction('[Category] Set All', props<{categories: Category[]}>());
export const fetchAllError  = createAction('[Category] Fetch All Error');