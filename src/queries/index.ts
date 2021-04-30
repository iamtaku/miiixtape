import { useQuery } from "react-query";

import axios from "axios";
import { ServerResponse, ServerTokenResponse, UserAttributes } from "./types";
import SpotifyWebApi from "spotify-web-api-js";

const BASE = "http://localhost:3000/api/v1";

type Token = string;

const getToken = async (code: Token) => {
  const {
    data: { token },
  } = await axios.get<ServerTokenResponse>(`${BASE}/callback/${code}`);
  return token;
};

const getUser = async () => {
  let token = window.localStorage.getItem("token");
  //if no token, fetch a new one
  if (token === null) {
    const code = window.location.search;
    token = await getToken(code);
    token && window.localStorage.setItem("token", token);
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios.get<ServerResponse>(`${BASE}/users`, {
    headers,
  });

  return data.data.data.attributes;
};

const getSpotifyInfo = async (access_token?: string, spotify_id?: string) => {
  console.log("called");
  if (access_token && spotify_id) {
    const client = new SpotifyWebApi();
    client.setAccessToken(access_token);
    console.log(access_token, spotify_id, client);
    return await client.getUser(spotify_id);
  }
};

export const GetUser = () =>
  useQuery<UserAttributes, Error>("userInfo", getUser, {
    refetchOnWindowFocus: false,
  });

export const GetSpotifyUser = (userInfo?: UserAttributes) =>
  useQuery(
    "spotifyInfo",
    () => getSpotifyInfo(userInfo?.access_token, userInfo?.spotify_id),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
    }
  );

// acce
