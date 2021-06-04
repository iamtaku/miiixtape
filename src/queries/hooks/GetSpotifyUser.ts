import SpotifyWebApi from "spotify-web-api-js";
import { useQuery } from "react-query";
import { useAuth } from "./useAuth";
import { UserAttributes } from "../types";

const getSpotifyInfo = async (userInfo?: UserAttributes) => {
  if (!userInfo) throw new Error("auth failed");
  if (userInfo.access_token && userInfo.spotify_id) {
    const client = new SpotifyWebApi();
    client.setAccessToken(userInfo.access_token);
    return await client.getUser(userInfo.spotify_id);
  }
};

export const GetSpotifyUser = () => {
  const userInfo = useAuth();

  return useQuery("spotifyInfo", () => getSpotifyInfo(userInfo), {
    enabled: !!userInfo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
