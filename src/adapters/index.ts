import axios from "axios";
import { ServerResponse, ServerTokenResponse, UserAttributes } from "./types";
import { useLocation } from "react-router";
import { Spotify } from "../components/players/Spotify";
import SpotifyWebApi from "spotify-web-api-js";

const BASE = "http://localhost:3000/api/v1";

export const getToken = async (code: string) => {
  const {
    data: { token },
  } = await axios.get<ServerTokenResponse>(`${BASE}/callback/${code}`);
  return token;
};

const getUserInfo = async () => {
  // debugger;
  let token = window.localStorage.getItem("token");
  if (token === null) {
    // const {search} = useLocation()
    const code = window.location.search;
    token = await getToken(code);
    window.localStorage.setItem("token", token);
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // try {
  const data = await axios.get<ServerResponse>(`${BASE}/users`, {
    headers,
  });

  return data.data.data.attributes;
  //   } catch (error) {
  //     console.error(error);
  // }
};

export const getUser = async () => {
  return await getUserInfo();
};

// export const getProfile = async() => {
//   const client = new SpotifyWebApi;
//   client.setAccessToken()

// }
