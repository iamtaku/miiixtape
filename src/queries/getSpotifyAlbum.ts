import SpotifyWebApi from "spotify-web-api-js";
import { mapSpotifyAlbumtoPlaylist } from "../helpers/mappingHelpers";
import { Playlist } from "../types/types";

export const getSpotifyAlbum = async (
  albumId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  try {
    const data = await client.getAlbum(albumId);
    return mapSpotifyAlbumtoPlaylist(data);
  } catch (error) {
    throw new Error(error);
  }
};
