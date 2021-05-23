import SpotifyWebApi from "spotify-web-api-js";
import { UserAttributes } from "../types";
import { useQuery } from "react-query";
import { GetUser } from "./GetUser";

const getPlaylist = async (access_token?: string) => {
  if (access_token) {
    const client = new SpotifyWebApi();
    client.setAccessToken(access_token);
    return await client.getUserPlaylists();
  }
};

export const GetAllSpotifyPlaylist = () => {
  const { data: userInfo } = GetUser();
  return useQuery(
    "spotifyPlaylistAll",
    () => getPlaylist(userInfo?.access_token),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
    }
  );
};
