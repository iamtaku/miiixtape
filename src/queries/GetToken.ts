import axios from "axios";
import { useQuery } from "react-query";
import { ServerTokenResponse } from "./types";

const BASE = "http://localhost:3000/api/v1";

const getToken = async () => {
  //if we have a token in localstorage return it
  let token = window.localStorage.getItem("token");
  if (token) {
    return token;
  } //otherwise, fetch a token

  const code = window.location.search;
  if (code) {
    const {
      data: { token },
    } = await axios.get<ServerTokenResponse>(`${BASE}/callback/${code}`);
    window.localStorage.setItem("token", token);
    window.history.replaceState(null, "new page title", "/app");
    return token;
  }
};

export const GetToken = () => useQuery("token", getToken);
