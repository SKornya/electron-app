import { combineReducers } from "redux";

import { appReducer } from "./appReducer";
import { chartReducer } from "./chartReducer";
import { dataReducer } from "./dataReducer";

const reducer = combineReducers({
  app: appReducer,
  chart: chartReducer,
  data: dataReducer,
});

export default reducer;
