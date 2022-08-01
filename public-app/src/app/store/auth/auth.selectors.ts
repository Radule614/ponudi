import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { AuthState } from './auth.reducer';

const authFeature = (state: AppState) => state.auth;
 
export const isLogged = createSelector(
  authFeature,
  (state: AuthState) => !!state.token
);

export const userRoles = createSelector(
  authFeature,
  (state: AuthState) => state.user?.roles
)

export const selectUser = createSelector(
  authFeature,
  (state: AuthState) => state.user
);