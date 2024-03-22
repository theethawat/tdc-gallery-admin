import MainService from '../services/MainService';
import ShoppingListModel from '../models/ShoppingList';

const ShoppingListService = new MainService(ShoppingListModel, 'shoppinglist');

export const onReadAll = async (req, res) => {
  try {
    let query = {};

    const result = await ShoppingListService.getAll({
      ...req.query,
      query,
      populateKey: 'products.product',
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onReadOne = async (req, res) => {
  try {
    const result = await ShoppingListService.getOne(
      req.params.id,
      'products.product',
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const onCreateOne = async (req, res) => {
  try {
    if (req?.body?.many === true) {
      const results = await ProductModel.insertMany(req?.body?.arr);
      res.status(201).send(results);
    } else {
      const result = await ShoppingListService.createOne(req.body);
      res.status(201).send(result);
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onEditOne = async (req, res) => {
  try {
    await ShoppingListService.updateOne(req.params.id, req.body);
    res.status(200).send({ message: 'Successfully Update' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const onDeleteOne = async (req, res) => {
  try {
    await ShoppingListService.deleteOne(req.params.id);
    res.status(204).send({ message: 'Delete Success' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default {
  onReadAll,
  onReadOne,
  onCreateOne,
  onEditOne,
  onDeleteOne,
};
