import axios from "axios";
import { Server } from "node:http";
import { useQuery } from "react-query";
import { ServerTokenResponse } from "./types";

const BASE = process.env.REACT_APP_BASE_URL;

const getToken = async () => {
  //if we have a token in localstorage return it
  let token = window.localStorage.getItem("token");
  if (token) {
    return token;
  } //otherwise, fetch a token

  const code = window.location.search;
  if (code) {
    try {
      const {
        data: { token },
      } = await axios.get<ServerTokenResponse>(`${BASE}/callback/${code}`);
      window.localStorage.setItem("token", token);
      window.history.replaceState(null, "new page title", "/app");
      return token;
    } catch (err) {
      return err;
    }
  }
};
export const GetToken = () =>
  useQuery<ServerTokenResponse | undefined>("token", getToken);
