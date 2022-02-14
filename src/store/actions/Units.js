import { GET_UNIT, SHOW_LOADING } from "./UnitTypes";
import { getUnits } from "../../service/unit";

export const retrieveUnits = () => async (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  try{
    const res = await getUnits();
    dispatch({
      type: GET_UNIT,
      payload: res.data
    });
  }catch(err){
    console.log(err);
  }
};