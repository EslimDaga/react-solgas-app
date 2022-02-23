import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getUnits = async () => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-units/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return response;
}

export const createUnit = async (data) => {
  const token = cache.getItem("user").token;
  const response = await axios.post(`${api}/control/web/api/create-unit/`, data, {
    validateStatus: function (status) {
      return status;
    },
    headers: {
      "Authorization": `JWT ${token}`,
    }
  });
  return response;
}

export const deleteUnit = async (license_plate) => {
  const token = cache.getItem("user").token;
  const response = await axios.delete(`${api}/control/web/api/delete-unit/${license_plate}/`,{
    headers: {
      "Authorization": `JWT ${token}`,
    }
  });
  return response;
}