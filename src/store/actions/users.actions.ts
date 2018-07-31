
import { ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../shared/axios';

import * as types from './types';

export interface IGetUsersStart {
  type: types.GET_USERS_START
}

export interface IGetUsersSuccess {
  type: types.GET_USERS_SUCCESS;
  payload: any[];
}

export interface IGetUsersFailed {
  type: types.GET_USERS_FAILED;
  payload: string;
}

export type UsersAction =
  | IGetUsersStart
  | IGetUsersSuccess
  | IGetUsersFailed;

const getUsersStart: ActionCreator<IGetUsersStart> =
  (): IGetUsersStart => ({
    type: types.GET_USERS_START
});

const getUsersSuccess: ActionCreator<IGetUsersSuccess> =
  (users: any[]): IGetUsersSuccess => ({
    type: types.GET_USERS_SUCCESS,
    payload: users
});

const getUsersFailed: ActionCreator<IGetUsersFailed> =
  (error: string): IGetUsersFailed => ({
    type: types.GET_USERS_FAILED,
    payload: error
});

export const getUsers = (pageSize: number = 30, pageIndex: number = 0): any =>
  (dispatch: Dispatch<UsersAction>): void => {
    dispatch(getUsersStart());
    const params = {
      page_size: pageSize,
      page_index: pageIndex
    };

    axios.get('/users', {params})
      .then(({ data: { data }}: AxiosResponse) => {
        dispatch(getUsersSuccess(data));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(getUsersFailed(response ? response.data.message : 'unable to get users'));
      });
};