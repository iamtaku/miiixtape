import SpotifyWebApi from "spotify-web-api-js";
import { mapSpotifyTracktoTrack } from "../helpers/mappingHelpers";
import { Playlist, PlaylistInfo, Song } from "../types/types";

const mapSpotifyPlaylistToPlaylist = (
  data: SpotifyApi.SinglePlaylistResponse
): Playlist => {
  const playlistInfo: PlaylistInfo = {
    id: data.id,
    name: data.name,
    description: data.description ? data.description : "",
    external_urls: data.external_urls.spotify || "",
    img: data.images[0] ? data.images[0].url : "",
    type: "playlist",
    service: "spotify",
  };
  const tracks: Song[] = data.tracks.items.map((item) => {
    const newItem = item.track as SpotifyApi.TrackObjectFull;
    return mapSpotifyTracktoTrack(newItem);
  });

  return {
    playlistInfo,
    tracks,
  };
};

export const getSingleSpotifyPlaylist = async (
  playlistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  try {
    const data = await client.getPlaylist(playlistId);
    return mapSpotifyPlaylistToPlaylist(data);
  } catch (error) {
    throw new Error(error);
  }
};
