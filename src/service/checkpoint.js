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