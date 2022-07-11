import { ItemCreate, Item } from 'types';
import ApiService from './api-service';
import { ItemChange } from '../types/item';

const fetchItems = async (): Promise<Item[]> => {
  const { data } = await ApiService.get<{ items: Item[] }>('api/items?populate=categories');
  return data.items;
};

const fetchOneItem = async (id: string) => {
  const { data } = await ApiService.get<{ item: Item }>(`/api/items/${id}?populate=categories`);
  return data.item;
};

const deleteItem = async (id: string, token: string) => {
  const { data } = await ApiService.delete<{ item: Item }>(`api/items/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return data.item;
};

const createNewItem = async (item: ItemCreate, token: string) => {
  const { data } = await ApiService.post<{ item: ItemCreate }>(
    'api/items/',
    item,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.item;
};

const changeItem = async (item: ItemChange, token: string) => {
  const { data } = await ApiService.patch<{ item: ItemChange }>(
    `api/items/${item.id}`,
    item,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.item;
};

const ItemsService = {
  fetchItems,
  deleteItem,
  createNewItem,
  changeItem,
  fetchOneItem,
};

export default ItemsService;
