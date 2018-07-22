import { ActionCreator, Dispatch } from 'redux';
import axios from '../../shared/axios';

import * as types from './types';
import { AxiosResponse, AxiosError } from '../../../node_modules/axios';

export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: any;
}

export interface ILoginFailed {
  type: types.LOGIN_FAILED;
  payload: string;
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
  (error: string): ILoginFailed => ({
    type: types.LOGIN_FAILED,
    payload: error
});

export const login = (email: string, password: string): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    axios.post('/login', {email, password})
      .then(({ data: { data }}: AxiosResponse) => {
        dispatch(loginSuccess(data.user, data.auth_token))
      })
      .catch(({ response }: AxiosError) => {
        dispatch(loginFailed(response ? response.data.message : 'unable to login'));
      });
};