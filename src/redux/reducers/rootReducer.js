import { combineReducers } from "redux";

import { banksReducer } from "./banksReducer/banksReducer";

const reducer = combineReducers({
  banks: banksReducer,
});

export default reducer;
