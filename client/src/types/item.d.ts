export type Item = {
  id: string,
  title: string,
  description: string,
  price: number,
  weight: number,
  img: string,
  composition: string,
  categories:
  {
    id: string,
    title: string
  }[],

};

export type ItemCreate = Omit<Item, 'id' | 'categories'> & {
  categories: string[];
};

export type ItemChange = Omit<Item, 'categories'> & {
  categories?: string[];
};
