import { ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../shared/axios';

import * as types from './types';
import authTokenService from '../../shared/services/auth-token.service';

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
        const { user, auth_token } = data;

        authTokenService.store(auth_token);
        dispatch(loginSuccess(user, auth_token));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(loginFailed(response ? response.data.message : 'unable to login'));
      });
};