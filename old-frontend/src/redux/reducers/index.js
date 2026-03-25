import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import PlaceReducer from "./PlaceReducer";
import CategoryReducer from "./CategoryReducer";
import ImageReducer from "./ImageReducer";
import ArticleReducer from "./ArticleReducer";

const rootReducers = combineReducers({
  me: MeReducer,
  place: PlaceReducer,
  category: CategoryReducer,
  image: ImageReducer,
  article: ArticleReducer,
});

export default rootReducers;
