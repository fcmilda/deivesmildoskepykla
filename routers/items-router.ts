import { Router } from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const itemsRouter = Router();

itemsRouter.get('/', getItems);
itemsRouter.get('/:id', getItem);
itemsRouter.post('/', authMiddleware, createItem);
itemsRouter.patch('/:id', authMiddleware, updateItem);
itemsRouter.delete('/:id', authMiddleware, deleteItem);

export default itemsRouter;
