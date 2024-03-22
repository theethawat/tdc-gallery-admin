import GeneralAction from "./GeneralAction";
import {
  SHOPPING_LIST_ALL,
  SHOPPING_LIST_CREATE,
  SHOPPING_LIST_DELETE,
  SHOPPING_LIST_EDIT,
  SHOPPING_LIST_ERROR,
  SHOPPING_LIST_GET,
} from "../type";

const ShoppingListAction = new GeneralAction("shopping-list", "Shopping List", {
  allConst: SHOPPING_LIST_ALL,
  oneConst: SHOPPING_LIST_GET,
  errorConst: SHOPPING_LIST_ERROR,
  createConst: SHOPPING_LIST_CREATE,
  updateConst: SHOPPING_LIST_EDIT,
  deleteConst: SHOPPING_LIST_DELETE,
});

export const getAllShoppingList = (query) =>
  ShoppingListAction.getAllData(query);
export const getOneShoppingList = (id) => ShoppingListAction.getOneData(id);
export const createOneShoppingList = (data) =>
  ShoppingListAction.createOne(data);
export const updateOneShoppingList = (id, payload) =>
  ShoppingListAction.editOne(id, payload);
export const deleteOneShoppingList = (id) => ShoppingListAction.deleteOne(id);
