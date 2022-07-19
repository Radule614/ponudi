import { createAction, props } from '@ngrx/store';
import User from 'src/app/model/user.model';


export const login = createAction('[Auth] Login',       props<{ username: string, password: string }>());
export const setUser = createAction('[Auth] Set User',  props<{ user: User }>());