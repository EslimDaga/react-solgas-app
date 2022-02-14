import { CREATE_UNIT, DELETE_UNIT, GET_UNIT, SHOW_LOADING } from "../actions/UnitTypes";

const initialState = {
  units: [],
  loading: true,
}

const unitReducer = (units = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_UNIT:
      return [...units, payload];
    case SHOW_LOADING:
      return { ...units, loading: true };
    case GET_UNIT:
      return { ...units, units: payload, loading: false };
    case DELETE_UNIT:
      return units.filter((unit) => unit.id !== payload);
    default:
      return units;
  }
}

export default unitReducer;