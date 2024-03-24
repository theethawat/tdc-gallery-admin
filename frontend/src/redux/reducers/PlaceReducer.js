import {
  PLACE_ALL,
  PLACE_CREATE,
  PLACE_DELETE,
  PLACE_EDIT,
  PLACE_ERROR,
  PLACE_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function PlaceReducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_ALL:
      return { ...action.payload, isReady: true };
    case PLACE_GET:
      return { ...action.payload, isReady: true };
    case PLACE_CREATE:
      return { ...action.payload, isReady: false };
    case PLACE_ERROR:
      return { ...action.payload, isReady: false };
    case PLACE_EDIT:
      return { isReady: false };
    case PLACE_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}
