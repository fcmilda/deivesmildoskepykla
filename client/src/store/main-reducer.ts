/* eslint-disable @typescript-eslint/default-param-last */
import { combineReducers } from 'redux';
import itemsReducer from './features/items/items-reducer';
import authReducer from './features/auth/auth-reducer';
import navigationReducer from './features/navigation/navigation-reducer';
import categoriesReducer from './features/categories/categories-reducer';

const mainReducer = combineReducers({
  items: itemsReducer,
  auth: authReducer,
  navigation: navigationReducer,
  categories: categoriesReducer,
});

export default mainReducer;
