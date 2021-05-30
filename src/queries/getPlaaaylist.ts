import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import { mapToPlaylist } from "../helpers/mappingHelpers";
import { Playlist } from "../types/types";
import { ServerPlaylist } from "./types";

export const getPlaaaylist = async (
  playlistId: string,
  token: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  const url = `${process.env.REACT_APP_BASE_URL}/playlists/${playlistId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const data = await axios.get<ServerPlaylist>(url, {
      headers,
    });
    return await mapToPlaylist(data.data, client);
  } catch (error) {
    throw new Error(error.message);
  }
};
