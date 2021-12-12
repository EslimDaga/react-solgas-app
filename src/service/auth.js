import axios from "axios";
import { api } from "../constants/global";

export const login = async (data) => {
  await axios.post(`${api}/token/obtain/`, {
    username: data.username,
    password: data.password,
  }).then(r => {
    console.log("Login response: ", r);
    fechtData(data.username, r.data.access).then(res => {
      const user = {
        ...res,
        token: r.data.access
      };
      console.log("Fetch data",user);
      return user;
    })
  }).catch(err => {
    console.log("Login Error", err);
    return err;
  });
}

export const fechtData = async (username, token) => {
  await axios.get(`${api}/users/web/api/get-user/${username}/`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  }).then(res => {
    console.log("Res Data", res.data);
    return res.data;
  }).catch(error => {
    console.log("Error fetchdata", error);
    return error;
  })
}