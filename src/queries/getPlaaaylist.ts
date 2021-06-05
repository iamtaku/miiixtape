import SpotifyWebApi from "spotify-web-api-js";
import { Playlist as PlaylistType } from "../types/types";
import { Playlist } from "./api";

export const getPlaaaylist = async (
  playlistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<PlaylistType> => {
  try {
    return await Playlist.getPlaylist(playlistId, client);
  } catch (error) {
    throw new Error(error);
  }
};
