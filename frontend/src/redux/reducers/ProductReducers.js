import { PRODUCT_ALL, PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_EDIT, PRODUCT_ERROR, PRODUCT_GET } from '../type'

const initialState = { isReady: false }

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_ALL:
      return { ...action.payload, isReady: true }
    case PRODUCT_GET:
      return { ...action.payload, isReady: true }
    case PRODUCT_CREATE:
      return { ...action.payload, isReady: false }
    case PRODUCT_ERROR:
      return { ...action.payload, isReady: false }
    case PRODUCT_EDIT:
      return { isReady: false }
    case PRODUCT_DELETE:
      return { isReady: false }

    default:
      return state
  }
}
