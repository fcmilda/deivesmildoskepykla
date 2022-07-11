import { CreateCategory, Category } from 'types';
import ApiService from './api-service';

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await ApiService.get<{ categories: Category[] }>('/api/categories');
  return data.categories;
};

const deleteCategory = async (id: string, token: string) => {
  const { data } = await ApiService.delete<{ category: Category }>(`api/categories/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return data.category;
};

const createNewCategory = async (category: CreateCategory, token: string) => {
  const { data } = await ApiService.post<{ category: Category }>(
    'api/categories/',
    category,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.category;
};

const changeCategory = async (category: Category, token: string) => {
  const { data } = await ApiService.patch<{ category: Category }>(
    `api/categories/${category.id}`,
    category,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.category;
};

const CategoriesService = {
  fetchCategories,
  deleteCategory,
  createNewCategory,
  changeCategory,
};

export default CategoriesService;
