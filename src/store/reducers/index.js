import { combineReducers } from "redux";
import drivers from "./Drivers";
import units from "./Units";

export default combineReducers({
  drivers,
  units
});