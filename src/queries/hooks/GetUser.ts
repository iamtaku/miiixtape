import { useQuery } from "react-query";

import axios from "axios";
import { ServerResponse, ServerTokenResponse, UserAttributes } from "../types";

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
  // console.log(url, headers);
  const data = await axios.get<ServerResponse>(url, {
    headers,
  });
  console.log(headers);

  return data.data.data.attributes;
};

export const GetUser = (token?: ServerTokenResponse) =>
  useQuery<UserAttributes, Error>("userInfo", getUser, {
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
