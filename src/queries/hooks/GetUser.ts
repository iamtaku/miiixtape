import { useQuery } from "react-query";
import axios from "axios";
import { ServerResponse, UserAttributes } from "../types";
import { useAuth } from "./useAuth";

const BASE = "http://localhost:3000/api/v1";

export const getUser = async () => {
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

export const GetUser = () => {
  const user = useAuth();
  return useQuery<UserAttributes, Error>("userInfo", getUser, {
    refetchOnWindowFocus: false,
  });
};
