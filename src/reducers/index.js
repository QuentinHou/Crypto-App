import { combineReducers } from "redux";
import stableReducer from "./stable.reducer";
import listReducer from "./list.recuder";

export default combineReducers({
  stableReducer,
  listReducer,
});
