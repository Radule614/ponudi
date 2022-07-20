import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.auth;
 
export const isLogged = createSelector(
  selectAuth,
  (state: AuthState) => !!state.token
);

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);