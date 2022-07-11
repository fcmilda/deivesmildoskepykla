/* eslint-disable @typescript-eslint/default-param-last */
import { Reducer } from 'redux';
import { CategoriesState, CategoriesAction } from './categories-types';

const initialState: CategoriesState = {
  categories: [],
  loading: false,
};

const categoriesReducer: Reducer<CategoriesState, CategoriesAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORIES_FETCH_CATEGORIES_LOADING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'CATEGORIES_FETCH_CATEGORIES_SUCCESS': {
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
    }

    default:
      return state;
  }
};

export default categoriesReducer;
