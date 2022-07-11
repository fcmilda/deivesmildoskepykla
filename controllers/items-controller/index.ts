import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import { formatItemValidationError } from './items-error-formatters';
import CategoryModel, { CategoryDocument } from '../../models/category-model';
import ItemModel, { ItemPopulatedDocument, ItemDocument, ItemProps } from '../../models/item-model';
import createItemViewModel, { ItemViewModel } from '../../view-model-creators/create-item-view-model';
import createItemPopulatedViewModel, { ItemPopulatedViewModel } from '../../view-model-creators/create-item-populated-view-model';

type SingularItemResponse = { item: ItemViewModel } | ErrorResponseBody;

const validateCategoriesIds = async (categoriesIds?: string[]) => {
  if (categoriesIds !== undefined && categoriesIds.length > 0) {
    const uniqCategoryIds = [...new Set(categoriesIds)];

    const foundCategories = await CategoryModel.find({
      // Ar yra tokių kategorių, kurių id yra viena iš <uniqCategoryIds> masyve esančių reikšmių?
      _id: { $in: uniqCategoryIds },
    });
    if (uniqCategoryIds.length !== foundCategories.length) {
      throw new Error('Dalis kategorijų neegzistuoja');
    }
    return uniqCategoryIds;
  }
  return [];
};

type GetItems = RequestHandler<
  unknown,
  { items: (ItemViewModel | ItemPopulatedViewModel)[] },
  unknown,
  { populate?: string }
>;
export const getItems: GetItems = async (req, res) => {
  const { populate } = req.query;
  const shouldPopulateCategories = populate === 'categories';

  let items: ItemViewModel[] | ItemPopulatedViewModel[];

  if (shouldPopulateCategories) {
    const itemPopulatedDocs = await ItemModel
      .find()
      .populate<{ categories: CategoryDocument[] }>('categories');
    items = itemPopulatedDocs.map(createItemPopulatedViewModel);
  } else {
    const itemDocs = await ItemModel.find();
    items = itemDocs.map(createItemViewModel);
  }

  res.status(200).json({ items });
};

type GetItem = RequestHandler<
  { id: string },
  { item: ItemViewModel | ItemPopulatedViewModel } | ErrorResponseBody,
  unknown,
  { populate?: string }
>;
export const getItem: GetItem = async (req, res) => {
  const { id } = req.params;
  const { populate } = req.query;
  const shouldPopulateCategories = populate === 'categories';

  try {
    const itemDoc = shouldPopulateCategories
      ? await ItemModel.findById(id).populate<{ categories: CategoryDocument[] }>('categories')
      : await ItemModel.findById(id);

    if (itemDoc === null) {
      throw new Error(`Produktas su id '${id}' nerastas`);
    }
    const item = shouldPopulateCategories
      ? createItemPopulatedViewModel(itemDoc as ItemPopulatedDocument)
      : createItemViewModel(itemDoc as ItemDocument);

    res.status(200).json({ item });
  } catch (error) {
    res.status(404).json({
      error: `Prekė su id '${id}' nerasta`,
    });
  }
};

type CreateItem = RequestHandler<
  unknown,
  SingularItemResponse,
  ItemProps
>;
export const createItem: CreateItem = async (req, res) => {
  const itemProps = req.body;
  try {
    const uniqCategoriesIds = await validateCategoriesIds(itemProps.categories);
    itemProps.categories = uniqCategoriesIds;
    const itemDoc = await ItemModel.create(itemProps);
    const itemViewModel = createItemViewModel(itemDoc);
    res.status(201).json({ item: itemViewModel });
  } catch (err) {
    const error = err instanceof Error.ValidationError
      ? formatItemValidationError(err)
      : 'Serverio klaida';
    res.status(400).json({ error });
  }
};

export const updateItem: RequestHandler<
  { id: string },
  SingularItemResponse,
  Partial<ItemProps>
> = async (req, res) => {
  const { id } = req.params;
  const itemProps = req.body;

  try {
    const uniqCategoriesIds = await validateCategoriesIds(itemProps.categories);
    itemProps.categories = uniqCategoriesIds;
    const itemDoc = await ItemModel.findByIdAndUpdate(id, itemProps, { new: true });
    if (itemDoc === null) {
      throw new Error(`Prekė su id '${id}' nerasta`);
    }
    const itemViewModel = createItemViewModel(itemDoc);
    res.status(200).json({ item: itemViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Blogi prekės duomenys',
    });
  }
};

export const deleteItem: RequestHandler<
  { id: string },
  SingularItemResponse
> = async (req, res) => {
  const { id } = req.params;

  try {
    const itemDoc = await ItemModel.findByIdAndDelete(id);
    if (itemDoc === null) {
      throw new Error(`Prekė su id '${id}' nerasta`);
    }
    const itemViewModel = createItemViewModel(itemDoc);
    res.status(200).json({ item: itemViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Klaida trinant prekę',
    });
  }
};
