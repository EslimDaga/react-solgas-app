import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getEvents = async() => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-events/`,{
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response.data;
}

export const getEventById = async(id) => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-event/${id}/`,{
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response.data;
}