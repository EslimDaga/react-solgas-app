import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getDrivers = async () => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-drivers/`, {
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response;
}

export const createDriver = async (data) => {
  const token = cache.getItem("user").token;
  const response = await axios.post(`${api}/control/web/api/create-driver/`, data, {
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response;
}

export const deleteDriver = async (id) => {
  const token = cache.getItem("user").token;
  const response = await axios.delete(`${api}/control/web/api/delete-driver/${id}/`, {
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response;
}