import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getUnits = async () => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-units/`,{
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response.data;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      cache.removeItem("user");
      window.location = "/login";
    }
  }
);

export const getSearchEvents = async(initial_date,final_date,unit_name) => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/search-events/${initial_date}/${final_date}/${unit_name}/`,{
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response.data;
}