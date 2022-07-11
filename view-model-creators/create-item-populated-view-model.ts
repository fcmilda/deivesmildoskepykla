import { ItemPopulatedDocument } from '../models/item-model';
import createCategoryViewModel, { CategoryViewModel } from './create-category-view-model';
import { ItemViewModel } from './create-item-view-model';

export type ItemPopulatedViewModel = Omit<ItemViewModel, 'categoryIds'> & {
  categories: CategoryViewModel[],
};

const createItemPopulatedViewModel = (
  itemPopulatedDoc: ItemPopulatedDocument,
): ItemPopulatedViewModel => ({
  id: itemPopulatedDoc._id.toString(),
  title: itemPopulatedDoc.title,
  description: itemPopulatedDoc.description,
  price: itemPopulatedDoc.price,
  weight: itemPopulatedDoc.weight,
  img: itemPopulatedDoc.img,
  composition: itemPopulatedDoc.composition,
  createdAt: itemPopulatedDoc.createdAt,
  updatedAt: itemPopulatedDoc.updatedAt,
  categories: itemPopulatedDoc.categories.map(createCategoryViewModel),
});

export default createItemPopulatedViewModel;
