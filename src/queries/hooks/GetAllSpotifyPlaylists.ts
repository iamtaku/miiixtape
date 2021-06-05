import SpotifyWebApi from "spotify-web-api-js";
import { useQuery } from "react-query";
import { GetUser } from "./GetUser";
import { Playlist } from "../../types/types";
import { UserAttributes } from "../types";
import { mapSpotifyToPlaylist } from "../../helpers/mappingHelpers";

const getPlaylist = async (userInfo?: UserAttributes): Promise<Playlist[]> => {
  if (userInfo?.access_token) {
    const client = new SpotifyWebApi();
    client.setAccessToken(userInfo?.access_token);
    const res = await client.getUserPlaylists();
    return mapSpotifyToPlaylist(res);
  }
  throw new Error("something wrong");
};

export const GetAllSpotifyPlaylist = () => {
  const { data: userInfo } = GetUser();
  return useQuery("spotifyPlaylistAll", () => getPlaylist(userInfo), {
    enabled: !!userInfo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
