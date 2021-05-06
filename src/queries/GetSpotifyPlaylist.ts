import SpotifyWebApi from "spotify-web-api-js";
import { UserAttributes } from "./types";
import { useQuery } from "react-query";

export const getSpotifyPlaylist = async (
  playlistId: string,
  access_token?: string
) => {
  try {
    if (access_token && playlistId) {
      const client = new SpotifyWebApi();
      client.setAccessToken(access_token);
      return await client.getPlaylist(playlistId);
    }
  } catch (error) {
    return new Error(error);
  }
};

export const GetSpotifyPlaylist = (
  playlistId: string,
  userInfo?: UserAttributes
) =>
  useQuery(
    `spotifyPlaylist-${playlistId}`,
    () => getSpotifyPlaylist(playlistId, userInfo?.access_token),
    {
      enabled: !!userInfo,
      staleTime: Infinity,
    }
  );
