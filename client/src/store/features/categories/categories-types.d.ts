import { Category } from 'types';

export type CategoriesState = {
  categories: Category[],
  loading: boolean
};

export type CategoriesFetchCategoriesLoadingAction = {
  type: 'CATEGORIES_FETCH_CATEGORIES_LOADING'
};

export type CategoriesFetchCategoriesSuccessAction = {
  type: 'CATEGORIES_FETCH_CATEGORIES_SUCCESS',
  payload: {
    categories: Category[],
  }
};

export type CategoriesAction = CategoriesFetchCategoriesLoadingAction | CategoriesFetchCategoriesSuccessAction;
