import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import PlaceReducer from "./PlaceReducer";
import CategoryReducer from "./CategoryReducer";

const rootReducers = combineReducers({
  me: MeReducer,
  place: PlaceReducer,
  category: CategoryReducer,
});

export default rootReducers;
