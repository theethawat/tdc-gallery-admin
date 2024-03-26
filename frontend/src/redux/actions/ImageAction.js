import GeneralAction from "./GeneralAction";
import {
  IMAGE_ALL,
  IMAGE_CREATE,
  IMAGE_DELETE,
  IMAGE_EDIT,
  IMAGE_ERROR,
  IMAGE_GET,
} from "../type";

const ImageAction = new GeneralAction("image", "Image", {
  allConst: IMAGE_ALL,
  oneConst: IMAGE_GET,
  errorConst: IMAGE_ERROR,
  createConst: IMAGE_CREATE,
  updateConst: IMAGE_EDIT,
  deleteConst: IMAGE_DELETE,
});

export const getAllImage = (query) => ImageAction.getAllData(query);
export const getOneImage = (id) => ImageAction.getOneData(id);
export const createOneImage = (data) => ImageAction.createOne(data);
export const updateOneImage = (id, payload) => ImageAction.editOne(id, payload);
export const deleteOneImage = (id) => ImageAction.deleteOne(id);
