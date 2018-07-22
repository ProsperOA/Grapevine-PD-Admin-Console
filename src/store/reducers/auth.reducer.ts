import * as types from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user: any;
  isAuth: boolean;
  token: string;
}

const initialState: Readonly<AuthState> = {
  user: null,
  isAuth: false,
  token: ''
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
      };
    case types.LOGIN_FAILED:
      return initialState;
    default:
      return state;
  }
};