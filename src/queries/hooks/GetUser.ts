import { useQuery } from "react-query";
import axios from "axios";
import { ServerResponse, UserAttributes } from "../types";

const BASE = "http://localhost:3000/api/v1";

const getUser = async () => {
  let token = window.localStorage.getItem("token");
  //if no token, fetch a new one
  if (!token) {
    throw new Error("No token");
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const url = `${BASE}/users`;
  const data = await axios.get<ServerResponse>(url, {
    headers,
  });

  return data.data.data.attributes;
};

export const GetUser = () =>
  useQuery<UserAttributes, Error>("userInfo", getUser, {
    refetchOnWindowFocus: false,
  });
