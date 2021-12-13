import axios from "axios";
import cache from "../helpers/cache";
import { api } from "../constants/global";

export const login = async (data) => {
  //Obtain Token
  const { username, password } = data;
  const getToken = await axios.post(`${api}/token/obtain/`, {
    username,
    password
  });
  const { access } = getToken.data;
  //Get User
  const getUser = await axios.get(`${api}/users/web/api/get-user/${username}/`,{
    headers: {
      Authorization: `JWT ${access}`
    }
  });
  const userInfo = getUser.data;
  const user = {
    ...userInfo,
    token : access
  }
  cache.setItem("user", user)
  return user;
}