import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/model/category.model";
import { CategoryDTO } from "src/app/services/category.service";

export const fetchAll               = createAction('[Category] Fetch All');
export const setAll                 = createAction('[Category] Set All',                props<{categories: Category[]}>());
export const fetchAllFailed         = createAction('[Category] Fetch All Failed');

export const createCategory         = createAction('[Category] Create Category',        props<{ category: CategoryDTO }>());
export const createCategoryFailed   = createAction('[Category] Create Category Failed', props<{ messages: string[]}>());

export const clearErrors            = createAction('[Category] Clear Errors');