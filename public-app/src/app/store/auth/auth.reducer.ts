import { createReducer, on } from '@ngrx/store';
import User from '../../model/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: new User("Radule614")
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setUser, (state, payload) => ({...state, user: payload.user}))
);