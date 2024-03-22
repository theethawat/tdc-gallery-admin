import {
  SHOPPING_LIST_ALL,
  SHOPPING_LIST_CREATE,
  SHOPPING_LIST_DELETE,
  SHOPPING_LIST_EDIT,
  SHOPPING_LIST_ERROR,
  SHOPPING_LIST_GET,
} from '../type'

const initialState = { isReady: false }

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function ShoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case SHOPPING_LIST_ALL:
      return { ...action.payload, isReady: true }
    case SHOPPING_LIST_GET:
      return { ...action.payload, isReady: true }
    case SHOPPING_LIST_CREATE:
      return { ...action.payload, isReady: false, isCreate: true }
    case SHOPPING_LIST_ERROR:
      return { ...action.payload, isReady: false }
    case SHOPPING_LIST_EDIT:
      return { isReady: false }
    case SHOPPING_LIST_DELETE:
      return { isReady: false }

    default:
      return state
  }
}
