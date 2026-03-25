import {
  IMAGE_ALL,
  IMAGE_CREATE,
  IMAGE_DELETE,
  IMAGE_EDIT,
  IMAGE_ERROR,
  IMAGE_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function ImageReducer(state = initialState, action) {
  switch (action.type) {
    case IMAGE_ALL:
      return { ...action.payload, isReady: true };
    case IMAGE_GET:
      return { ...action.payload, isReady: true };
    case IMAGE_CREATE:
      return { ...action.payload, isReady: false };
    case IMAGE_ERROR:
      return { ...action.payload, isReady: false };
    case IMAGE_EDIT:
      return { isReady: false };
    case IMAGE_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}
