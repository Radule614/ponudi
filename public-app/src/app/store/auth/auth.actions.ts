import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { registerDTO } from '../../services/auth.service';


export const login            = createAction('[Auth] Login',              props<{ username: string, password: string }>());
export const loginSuccess     = createAction('[Auth] Login Success',      props<{ token: string }>());
export const loginFailed      = createAction('[Auth] Login Failed',       props<{ message: string }>());
export const loginClear       = createAction('[Auth] Login Clear');
export const setLoading       = createAction('[Auth] Set Loading',        props<{ loading: boolean }>());
export const logout           = createAction('[Auth] Logout');
export const checkAuth        = createAction('[Auth] Check Auth');
export const fetchUser        = createAction('[Auth] Fetch User');
export const fetchUserSuccess = createAction('[Auth] Fetch User Success', props<{ user: User }>());
export const fetchUserFailed  = createAction('[Auth] Fetch User Failed');
export const register         = createAction('[Auth] Register',           props<{ userData: registerDTO }>());
export const registerSuccess  = createAction('[Auth] Register Success',   props<{ username: string, password: string }>())
export const registerFailed   = createAction('[Auth] Register Failed',    props<{ messages: string[] }>())
export const registerClear    = createAction('[Auth] Register Clear');
