/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { AuthState, AuthAction } from './auth-types';

import { getLocalStorageItem, setLocalStorageItem } from '../../../helpers/local-storage-helpers';

const { REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE } = process.env;

if (REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE === undefined) {
  throw new Error('Please define REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE in /.env.local');
}

const initialState: AuthState = {
  token: getLocalStorageItem(REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE),
  admin: null,
  error: null,
  loading: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOADING': {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case 'AUTH_SUCCESS': {
      setLocalStorageItem(REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE, action.payload.token);
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        loading: false,
      };
    }

    case 'AUTH_FAILURE': {
      localStorage.removeItem(REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE);
      return {
        ...state,
        error: action.payload.error,
        admin: null,
        token: null,
        loading: false,
      };
    }

    case 'AUTH_LOGOUT': {
      localStorage.removeItem(REACT_APP_AUTH_TOKEN_IN_LOCAL_STORAGE);
      return {
        ...state,
        admin: null,
        token: null,
      };
    }

    case 'AUTH_CLEAR_ERROR': {
      return {
        ...state,
        error: null,
      };
    }

    default: return state;
  }
};

export default authReducer;
