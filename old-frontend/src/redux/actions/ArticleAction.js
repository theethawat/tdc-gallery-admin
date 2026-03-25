import GeneralAction from "./GeneralAction";
import {
  ARTICLE_ALL,
  ARTICLE_CREATE,
  ARTICLE_DELETE,
  ARTICLE_EDIT,
  ARTICLE_ERROR,
  ARTICLE_GET,
} from "../type";

const ArticleAction = new GeneralAction("article", "Article", {
  allConst: ARTICLE_ALL,
  oneConst: ARTICLE_GET,
  errorConst: ARTICLE_ERROR,
  createConst: ARTICLE_CREATE,
  updateConst: ARTICLE_EDIT,
  deleteConst: ARTICLE_DELETE,
});

export const getAllArticle = (query) => ArticleAction.getAllData(query);
export const getOneArticle = (id) => ArticleAction.getOneData(id);
export const createOneArticle = (data) => ArticleAction.createOne(data);
export const updateOneArticle = (id, payload) =>
  ArticleAction.editOne(id, payload);
export const deleteOneArticle = (id) => ArticleAction.deleteOne(id);
