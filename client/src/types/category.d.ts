export type Category = {
  id: string,
  title: string,
};

export type CreateCategory = Omit<Category, 'id'>;
