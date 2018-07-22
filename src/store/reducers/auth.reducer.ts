import * as types from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user: any;
  isAuth: boolean;
  token: string;
  error: string;
}

const initialState: Readonly<AuthState> = {
  user: null,
  isAuth: false,
  token: '',
  error: ''
}

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isAuth: true,
        error: ''
      };
    case types.LOGIN_FAILED:
      return {...state, error: action.payload};
    default:
      return state;
  }
};