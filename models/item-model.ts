import {
  Schema,
  Types,
  Document,
  Model,
  model,
} from 'mongoose';
import { CategoryDocument } from './category-model';

type Item = {
  title: string,
  description: string,
  price: number,
  weight: number,
  img: string,
  composition: string,
  categories: Types.ObjectId[],
  createdAt: string,
  updatedAt: string,
};

export type ItemProps = Omit<Item, 'createdAt' | 'updatedAt' | 'categories'> & {
  categories?: string[],
};

export type ItemDocument = Document<Types.ObjectId, unknown, Item> & Item & {
  _id: Types.ObjectId;
};

export type ItemPopulatedDocument = Omit<ItemDocument, 'categories'> & {
  categories: CategoryDocument[]
};

const itemSchema = new Schema<Item, Model<Item>>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  composition: {
    type: String,
    required: true,
  },
  categories: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    default: [],
  },
}, {
  timestamps: true,
});

const ItemModel = model('Item', itemSchema);

export default ItemModel;
