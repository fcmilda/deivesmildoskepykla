import { CategoryDocument } from '../models/category-model';

export type CategoryViewModel = {
  id: string,
  title: string,
};

const createCategoryViewModel = (categoryDoc: CategoryDocument): CategoryViewModel => ({
  id: categoryDoc._id.toString(),
  title: categoryDoc.title,
});

export default createCategoryViewModel;
