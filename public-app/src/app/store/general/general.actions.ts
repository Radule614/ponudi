import { createAction } from "@ngrx/store";

export const activateLoading    = createAction('[App] Activate Loading');
export const deactivateLoading  = createAction('[App] Deactivate Loading');