import { combineReducers, Reducer } from 'redux';
import AuthReducer, { AuthState } from './auth.reducer';

export interface AppState {
  auth: AuthState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth: AuthReducer
});

export default rootReducer;