import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const getCheckpoints = async () => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-checkpoints/`, {
    headers: {
      "Authorization": `JWT ${token}`
    }
  });
  return response.data;
}

export const getCheckpoinByName = async(name) => {
  const token = cache.getItem("user").token;
  const response = await axios.get(`${api}/control/web/api/get-checkpoint/${name}/`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  console.log(response.data);
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