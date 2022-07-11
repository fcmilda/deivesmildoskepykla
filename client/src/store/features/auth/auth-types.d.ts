import { Admin } from '../../../types';

export type AuthState = {
  token: string | null,
  admin: Admin | null,
  error: string | null,
  loading: boolean,
};

export type AuthLoadingAction = {
  type: 'AUTH_LOADING',
};

export type AuthLogoutAction = {
  type: 'AUTH_LOGOUT',
};

export type AuthClearErrorAction = {
  type: 'AUTH_CLEAR_ERROR',
};

export type AuthSuccessAction = {
  type: 'AUTH_SUCCESS',
  payload: {
    admin: Admin,
    token: string,
  }
};

export type AuthFailureAction = {
  type: 'AUTH_FAILURE',
  payload: {
    error: string,
  }
};

export type AuthAction = AuthSuccessAction | AuthFailureAction | AuthLoadingAction | AuthLogoutAction | AuthClearErrorAction;
