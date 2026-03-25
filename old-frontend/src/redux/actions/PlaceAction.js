import GeneralAction from "./GeneralAction";
import {
  PLACE_ALL,
  PLACE_CREATE,
  PLACE_DELETE,
  PLACE_EDIT,
  PLACE_ERROR,
  PLACE_GET,
} from "../type";

const PlaceAction = new GeneralAction("place", "Place", {
  allConst: PLACE_ALL,
  oneConst: PLACE_GET,
  errorConst: PLACE_ERROR,
  createConst: PLACE_CREATE,
  updateConst: PLACE_EDIT,
  deleteConst: PLACE_DELETE,
});

export const getAllPlace = (query) => PlaceAction.getAllData(query);
export const getOnePlace = (id) => PlaceAction.getOneData(id);
export const createOnePlace = (data) => PlaceAction.createOne(data);
export const updateOnePlace = (id, payload) => PlaceAction.editOne(id, payload);
export const deleteOnePlace = (id) => PlaceAction.deleteOne(id);
