import {
  CATEGORY_ALL,
  CATEGORY_CREATE,
  CATEGORY_DELETE,
  CATEGORY_EDIT,
  CATEGORY_ERROR,
  CATEGORY_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function CategoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_ALL:
      return { ...action.payload, isReady: true };
    case CATEGORY_GET:
      return { ...action.payload, isReady: true };
    case CATEGORY_CREATE:
      return { ...action.payload, isReady: false };
    case CATEGORY_ERROR:
      return { ...action.payload, isReady: false };
    case CATEGORY_EDIT:
      return { isReady: false };
    case CATEGORY_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}
