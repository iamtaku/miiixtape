import SpotifyWebApi from "spotify-web-api-js";
import { UserAttributes } from "./types";
import { useQuery } from "react-query";

const getSpotifyPlaylist = async (
  playlistId: string,
  access_token?: string
) => {
  console.log(access_token, playlistId);
  if (access_token && playlistId) {
    const client = new SpotifyWebApi();
    client.setAccessToken(access_token);
    return await client.getPlaylist(playlistId);
  }
};

export const GetSpotifyPlaylist = (
  playlistId: string,
  userInfo?: UserAttributes
) =>
  useQuery(
    "spotifyPlaylist",
    () => getSpotifyPlaylist(playlistId, userInfo?.access_token),
    {
      enabled: !!playlistId,
      staleTime: Infinity,
    }
  );
