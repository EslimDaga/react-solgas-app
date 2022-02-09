import { GET_DRIVERS, CREATE_DRIVER, DELETE_DRIVER, SHOW_LOADING } from "./DriverTypes";
import { createDriver, deleteDriver, getDrivers } from "../../service/driver";

export const addDriver = (dni, firstname, lastname, license_number) => async (dispatch) => {
  try {
    const res = await createDriver();
    dispatch({
      type: CREATE_DRIVER,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveDrivers = () => async (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  try{
    const res = await getDrivers();
    dispatch({
      type: GET_DRIVERS,
      payload: res.data
    });
  }catch(err){
    console.log(err);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await deleteDriver(id);
    dispatch({
      type: DELETE_DRIVER,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};