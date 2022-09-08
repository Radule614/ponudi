import { createAction, props } from "@ngrx/store";
import { Shop } from "src/app/model/shop.model";

export const fetchAll           = createAction('[Shop] Fetch All',          props<{ page: number }>());
export const fetchAllByUser     = createAction('[Shop] Fetch All By User',  props<{ userId: string, page: number }>());
export const setAll             = createAction('[Shop] Set All',            props<{ shops: Shop[], page: number, count: number }>());

export const fetchShop          = createAction('[Shop] Fetch Shop',         props<{ id: string }>());
export const setShop            = createAction('[Shop] Set Shop',           props<{ shop: Shop }>());
export const fetchFailed        = createAction('[Shop] Fetch Failed');  

export const createShop         = createAction('[Shop] Create Shop',        props<{ shop: Shop }>());
export const editShop           = createAction('[Shop] Edit Shop',          props<{ id: string, shop: Shop }>());
export const deleteShop         = createAction('[Shop] Delete Shop',        props<{ id: string, userId: string }>());

export const shopSuccess        = createAction('[Shop] Shop Success');
export const shopError          = createAction('[Shop] Shop Error',         props<{ messages: string[] }>());
export const clearErrors        = createAction('[Shop] Clear Errors');

export const deleteSuccess      = createAction('[Shop] Delete Success',     props<{ id: string, userId: string, }>());

export const activateLoading    = createAction('[Shop] Activate Loading');
export const deactivateLoading  = createAction('[Shop] Deactivate Loading');