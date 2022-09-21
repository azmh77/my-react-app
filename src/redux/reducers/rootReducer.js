import { combineReducers } from "redux";

import { banksReducer } from "./banksReducer/banksReducer";
import { projectReducer } from "./projectReducer/projectReducer";

const reducer = combineReducers({
  banks: banksReducer,
  project: projectReducer,
});

export default reducer;
