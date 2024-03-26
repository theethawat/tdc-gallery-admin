import {
  ARTICLE_ALL,
  ARTICLE_CREATE,
  ARTICLE_DELETE,
  ARTICLE_EDIT,
  ARTICLE_ERROR,
  ARTICLE_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function ArticleReducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_ALL:
      return { ...action.payload, isReady: true };
    case ARTICLE_GET:
      return { ...action.payload, isReady: true };
    case ARTICLE_CREATE:
      return { ...action.payload, isReady: false };
    case ARTICLE_ERROR:
      return { ...action.payload, isReady: false };
    case ARTICLE_EDIT:
      return { isReady: false };
    case ARTICLE_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}
