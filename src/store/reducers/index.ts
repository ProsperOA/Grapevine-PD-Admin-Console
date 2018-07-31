import { combineReducers, Reducer } from 'redux';
import AuthReducer, { AuthState } from './auth.reducer';
import UsersReducer, { UsersState } from './users.reducer';

export interface AppState {
  auth: AuthState,
  users: UsersState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth: AuthReducer,
  users: UsersReducer
});

export default rootReducer;