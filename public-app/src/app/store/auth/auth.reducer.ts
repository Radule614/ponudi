import { createReducer, on } from '@ngrx/store';
import User from '../../model/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  loginError: string;
  loading: boolean;
  registerErrors: string[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  loginError: "",
  loading: false,
  registerErrors: []
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess,      (state, payload)  => ({ ...state, token: payload.token, loading:false })),
  on(AuthActions.setLoading,        (state, payload)  => ({ ...state, loading: payload.loading })),
  on(AuthActions.loginFailed,       (state, payload)  => ({ ...state, loginError: payload.message, loading:false })),
  on(AuthActions.loginClear,        (state, _)        => ({ ...state, loginError: "", loading:false })),
  on(AuthActions.logout,            (__, _)           => ({ ...initialState })),
  on(AuthActions.checkAuth,         (state, _)        => ({ ...state, token: localStorage.getItem('token') })),
  on(AuthActions.fetchUserSuccess,  (state, payload)  => ({ ...state, user: payload.user })),
  on(AuthActions.registerFailed,    (state, payload)  => ({ ...state, registerErrors: payload.messages, loading:false })),
  on(AuthActions.registerClear,     (state, _)        => ({ ...state, registerErrors: [], loading:false })),
);