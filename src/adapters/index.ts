import axios from "axios";
import { ServerResponse } from "./types";

const BASE = "http://localhost:3000/api/v1";

const getToken = async (code: string) => {
  const {
    data: { token },
  } = await axios.get<ServerResponse>(`${BASE}/callback/${code}`);
  return token;
};

const getUserInfo = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.get<ServerResponse>(`${BASE}/users`, {
    headers,
  });
};

export const getUser = async (callbackCode: string) => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    const token = await getToken(callbackCode);
    window.localStorage.setItem("token", token);
  }

  const data = token && (await getUserInfo(token));

  console.log(data);
};
