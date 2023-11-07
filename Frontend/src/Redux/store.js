import { combineReducers, legacy_createStore as createStore } from "redux";
import keyIndicatorsReducer from './keyIndicatorReducer'
import {sideBarReducer} from "./sideBarReducer";

const rootReducer = combineReducers({
  keyIndicators: keyIndicatorsReducer,
  sideBar: sideBarReducer,
});

const store = createStore(rootReducer);

export default store;
