import * as _ from 'lodash';

import * as types from '../actions/types';
import { UsersAction } from '../actions';

export interface UsersState {
  users: any[];
  loading: boolean;
  error: string;
}

const initialState: Readonly<UsersState> = {
  users: [],
  loading: false,
  error: ''
};

export default (state: UsersState = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case types.USERS_LOADING_START:
      return {...state, loading: true};
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: _.uniqWith([...state.users, ...action.payload], _.isEqual),
        loading: false,
        error: ''
      };
    case types.GET_USERS_FAILED:
      return {...state, loading: false, error: action.payload};
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        error: ''
      };
    case types.CREATE_USER_FAILED:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};