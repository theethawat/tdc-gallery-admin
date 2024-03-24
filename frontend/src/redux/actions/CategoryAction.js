import GeneralAction from "./GeneralAction";
import {
  CATEGORY_ALL,
  CATEGORY_CREATE,
  CATEGORY_DELETE,
  CATEGORY_EDIT,
  CATEGORY_ERROR,
  CATEGORY_GET,
} from "../type";

const CategoryAction = new GeneralAction("category", "Category", {
  allConst: CATEGORY_ALL,
  oneConst: CATEGORY_GET,
  errorConst: CATEGORY_ERROR,
  createConst: CATEGORY_CREATE,
  updateConst: CATEGORY_EDIT,
  deleteConst: CATEGORY_DELETE,
});

export const getAllCategory = (query) => CategoryAction.getAllData(query);
export const getOneCategory = (id) => CategoryAction.getOneData(id);
export const createOneCategory = (data) => CategoryAction.createOne(data);
export const updateOneCategory = (id, payload) =>
  CategoryAction.editOne(id, payload);
export const deleteOneCategory = (id) => CategoryAction.deleteOne(id);
