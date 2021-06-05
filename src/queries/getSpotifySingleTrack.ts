import SpotifyWebApi from "spotify-web-api-js";
import { mapSpotifyTracktoTrack } from "../helpers/mappingHelpers";
import { Song } from "../types/types";
export const getSpotifySingleTrack = async (
  id: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Song> => {
  try {
    const data = await client.getTrack(id);
    return mapSpotifyTracktoTrack(data);
  } catch (error) {
    throw new Error(error.message);
  }
};
