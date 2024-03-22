import { combineReducers } from 'redux'

import MeReducer from './MeReducers'
import ProductReducer from './ProductReducers'
import ShoppingListReducer from './ShoppingListReucers'

const rootReducers = combineReducers({
  me: MeReducer,
  product: ProductReducer,
  shoppingList: ShoppingListReducer,
})

export default rootReducers
