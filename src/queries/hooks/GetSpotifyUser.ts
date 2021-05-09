import SpotifyWebApi from "spotify-web-api-js";
import { UserAttributes } from "../types";
import { useQuery } from "react-query";

const getSpotifyInfo = async (access_token?: string, spotify_id?: string) => {
  // console.log("called");
  if (access_token && spotify_id) {
    const client = new SpotifyWebApi();
    client.setAccessToken(access_token);
    // console.log(access_token, spotify_id, client);
    return await client.getUser(spotify_id);
  }
};

export const GetSpotifyUser = (userInfo?: UserAttributes) =>
  useQuery(
    "spotifyInfo",
    () => getSpotifyInfo(userInfo?.access_token, userInfo?.spotify_id),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
