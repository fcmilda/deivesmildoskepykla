import { Dispatch } from 'redux';
import ItemsService from 'services/items-service';
import { Item, ItemCreate, ItemChange } from 'types';
import { AppAction, RootState } from '../../types';
import {
  ItemsFetchItemsLoadingAction,
  ItemsFetchItemsSuccessAction,
  ItemsFetchItemSuccessAction,
} from './items-types';

const itemsFetchItemsLoadingAction: ItemsFetchItemsLoadingAction = {
  type: 'ITEMS_FETCH_ITEMS_LOADING',
};

const createItemsFecthItemsSuccessAction = (items: Item[]): ItemsFetchItemsSuccessAction => ({
  type: 'ITEMS_FETCH_ITEMS_SUCCESS',
  payload: { items },
});

const createItemsFetchItemSuccessAction = (item: Item): ItemsFetchItemSuccessAction => ({
  type: 'ITEMS_FETCH_ITEM_SUCCESS',
  payload: { item },
});

export const itemsFetchItemsActionThunk = async (dispatch: Dispatch<AppAction>): Promise<void> => {
  dispatch(itemsFetchItemsLoadingAction);
  const items = await ItemsService.fetchItems();
  const itemsFetchItemsSuccessAction = createItemsFecthItemsSuccessAction(items);
  dispatch(itemsFetchItemsSuccessAction);
};

export const createItemsFetchOneActionThunk = (id: string) => async (
  dispatch: Dispatch<AppAction>,
): Promise<void> => {
  dispatch(itemsFetchItemsLoadingAction);
  const item = await ItemsService.fetchOneItem(id);
  const itemsFetchItemSuccessAction = createItemsFetchItemSuccessAction(item);
  dispatch(itemsFetchItemSuccessAction);
};

export const createItemsNewItemActionThunk = (item: ItemCreate) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
): Promise<void> => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Prašome prisijungti');
  }
  await ItemsService.createNewItem(item, token);
  itemsFetchItemsActionThunk(dispatch);
};

export const createItemsUpdateItemActionThunk = (item: ItemChange) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Prašome prisijungti');
  }
  await ItemsService.changeItem(item, token);
  itemsFetchItemsActionThunk(dispatch);
};

export const createItemsDeleteItemActionThunk = (id: string) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  const { token } = getState().auth;
  if (token === null) {
    throw new Error('Prašome prisijungti');
  }
  await ItemsService.deleteItem(id, token);
  itemsFetchItemsActionThunk(dispatch);
};
