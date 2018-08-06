
import { ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../shared/axios';

import * as types from './types';

export interface IUsersLoadingStart {
  type: types.USERS_LOADING_START
}

export interface IGetUsersSuccess {
  type: types.GET_USERS_SUCCESS;
  payload: {
    users: any[];
    clear: boolean;
  };
}

export interface IGetUsersFailed {
  type: types.GET_USERS_FAILED;
  payload: string;
}

export interface ICreateUserSuccess {
  type: types.CREATE_USER_SUCCESS,
  payload: any;
}

export interface ICreateUserFailed{
  type: types.CREATE_USER_FAILED,
  payload: string;
}

export type UsersAction =
  | IUsersLoadingStart
  | IGetUsersSuccess
  | IGetUsersFailed
  | ICreateUserSuccess
  | ICreateUserFailed;

const usersLoadingStart: ActionCreator<IUsersLoadingStart> =
  (): IUsersLoadingStart => ({
    type: types.USERS_LOADING_START
});

const getUsersSuccess: ActionCreator<IGetUsersSuccess> =
  (users: any[], clear: boolean): IGetUsersSuccess => ({
    type: types.GET_USERS_SUCCESS,
    payload: { users, clear }
});

const getUsersFailed: ActionCreator<IGetUsersFailed> =
  (error: string): IGetUsersFailed => ({
    type: types.GET_USERS_FAILED,
    payload: error
});

const createUserSuccess: ActionCreator<ICreateUserSuccess> =
  (user: any): ICreateUserSuccess => ({
    type: types.CREATE_USER_SUCCESS,
    payload: user
});

const createUserFailed: ActionCreator<ICreateUserFailed> =
  (error: string): ICreateUserFailed => ({
    type: types.CREATE_USER_FAILED,
    payload: error
});

export const getUsers = (pageSize: number = 30, pageIndex: number = 0, name: string = ''): any =>
  (dispatch: Dispatch<UsersAction>): void => {
    dispatch(usersLoadingStart());

    const clear = name !== '';
    const params = {
      name,
      page_size: pageSize,
      page_index: pageIndex
    };

    axios.get('/users', {params})
      .then(({ data: { data }}: AxiosResponse) => {
        dispatch(getUsersSuccess(data, clear));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(getUsersFailed(response ? response.data.message : 'unable to get users'));
      });
};

export const createUser = (user: any): any =>
  (dispatch: Dispatch<UsersAction>): void => {
    dispatch(usersLoadingStart());

    const { email, password } = user;
    const body = {
      email,
      password,
      first_name: user.firstName,
      last_name: user.lastName,
      created_by: user.createdBy
    };

    axios.post('/users/create', {...body})
      .then(({ data: { data }}: AxiosResponse) => dispatch(createUserSuccess(data)))
      .catch(({ response }: AxiosError) => {
        dispatch(createUserFailed(response ? response.data.message : 'unable to create user'));
      });
};