import { ItemDocument } from '../models/item-model';

export type ItemViewModel = {
  id: string,
  title: string,
  description: string,
  price: number,
  weight: number,
  img: string,
  composition: string,
  createdAt: string,
  updatedAt: string,
  categoryIds: string[],
};

const createItemViewModel = (itemDoc: ItemDocument): ItemViewModel => ({
  id: itemDoc._id.toString(),
  title: itemDoc.title,
  description: itemDoc.description,
  price: itemDoc.price,
  weight: itemDoc.weight,
  img: itemDoc.img,
  composition: itemDoc.composition,
  createdAt: itemDoc.createdAt,
  updatedAt: itemDoc.updatedAt,
  categoryIds: itemDoc.categories.map((categoryId) => categoryId.toString()),
});

export default createItemViewModel;
