import { CREATE_DRIVER, DELETE_DRIVER, GET_DRIVERS, SHOW_LOADING } from "../actions/DriverTypes";

const initialState = {
  drivers: [],
  loading: true,
};

const driverReducer = (drivers = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_DRIVER:
      return [...drivers, payload];
    case SHOW_LOADING:
      return { ...drivers, loading: true };
    case GET_DRIVERS:
      return { ...drivers, drivers: payload, loading: false };
    case DELETE_DRIVER:
      return drivers.filter((driver) => driver.id !== payload);
    default:
      return drivers;
  }
}

export default driverReducer;