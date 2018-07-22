import { ActionCreator, Dispatch } from 'redux';
import axios from '../../shared/axios';

import * as types from './types';
import { AxiosResponse } from '../../../node_modules/axios';

export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: any;
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
}

export type AuthAction =
  | ILoginSuccess
  | ILoginFailed;

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any, authToken: string): ILoginSuccess => ({
    type: types.LOGIN_SUCCESS,
    payload: { user, token: authToken }
});

const loginFailed: ActionCreator<ILoginFailed> =
  (): ILoginFailed => ({
    type: types.LOGIN_FAILED
});

export const login = (email: string, password: string): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    console.log({email, password})
    axios.post('/login', {email, password})
      .then(({ data: { data }}: AxiosResponse) => {
        dispatch(loginSuccess(data.user, data.auth_token))
      })
      .catch(() => dispatch(loginFailed()));
};