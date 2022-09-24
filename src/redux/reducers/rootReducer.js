import { combineReducers } from "redux";

import { banksReducer } from "./banksReducer/banksReducer";
import { projectReducer } from "./projectReducer/projectReducer";
import { timeDate_Reducer } from "./timeDate_Reducer/timeDate_Reducer";
import { costCenterReducer } from "./costCenterReducer/costCenterReducer";
import { fiscalYearReducer } from "./fiscalYearReducer/fiscalYearReducer";
import { guildReducer } from "./guildReducer/guildReducer";

const reducer = combineReducers({
  banks: banksReducer,
  project: projectReducer,
  date: timeDate_Reducer,
  CostCenter: costCenterReducer,
  FiscalYear: fiscalYearReducer,
  guild: guildReducer,
});

export default reducer;
