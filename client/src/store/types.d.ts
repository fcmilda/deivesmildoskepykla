import { ThunkDispatch } from 'redux-thunk';
import { ItemsAction, ItemsState } from './features/items/items-types';
import { AuthAction, AuthState } from './features/auth/auth-types';
import { NavigationAction, NavigationState } from './features/navigation/types';
import { CategoriesState, CategoriesAction } from './features/categories/categories-types';

export type RootState = {
  items: ItemsState,
  auth: AuthState,
  navigation: NavigationState,
  categories: CategoriesState,
};

export type AppAction = AuthAction | ItemsAction | NavigationAction | CategoriesAction;

export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;
