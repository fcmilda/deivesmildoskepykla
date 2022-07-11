import { Item } from 'types';

export type ItemsState = {
  items: Item[],
  loading: boolean
};

export type ItemsFetchItemsLoadingAction = {
  type: 'ITEMS_FETCH_ITEMS_LOADING'
};

export type ItemsFetchItemsSuccessAction = {
  type: 'ITEMS_FETCH_ITEMS_SUCCESS',
  payload: {
    items: Item[],
  }
};

export type ItemsFetchItemSuccessAction = {
  type: 'ITEMS_FETCH_ITEM_SUCCESS',
  payload: {
    item: Item,
  }
};

export type ItemsAction = ItemsFetchItemsLoadingAction | ItemsFetchItemsSuccessAction | ItemsFetchItemSuccessAction;
