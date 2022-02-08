import { CREATE_DRIVER, DELETE_DRIVER, GET_DRIVERS } from "../actions/DriverTypes";

const initialState = [];

const driverReducer = (drivers = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_DRIVER:
      return [...drivers, payload];
    case GET_DRIVERS:
      return payload;
    case DELETE_DRIVER:
      return drivers.filter((driver) => driver.id !== payload);
    default:
      return drivers;
  }
}

export default driverReducer;