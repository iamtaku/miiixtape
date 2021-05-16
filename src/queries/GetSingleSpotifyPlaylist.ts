import SpotifyWebApi from "spotify-web-api-js";
import { Playlist, PlaylistInfo, Song } from "../types/types";

const mapSpotifyPlaylistToPlaylist = (
  data: SpotifyApi.SinglePlaylistResponse
): Playlist => {
  console.log(data);
  const playlistInfo: PlaylistInfo = {
    id: data.id,
    name: data.name,
    description: data.description ? data.description : "",
    external_urls: data.external_urls.spotify,
    img: data.images ? data.images[0].url : "",
  };

  const tracks: Song[] =
    data.tracks &&
    data.tracks.items.map((item) => {
      return {
        name: item.track.name,
        id: item.track.id,
        service: "spotify",
        uri: item.track.uri,
        // img: item.track.album.
      };
    });
  return {
    playlistInfo,
    tracks,
  } as Playlist;
};

export const getSingleSpotifyPlaylist = async (
  playlistId: string,
  access_token?: string
): Promise<Playlist> => {
  try {
    if (access_token && playlistId) {
      const client = new SpotifyWebApi();
      client.setAccessToken(access_token);
      const data = await client.getPlaylist(playlistId);
      return mapSpotifyPlaylistToPlaylist(data);
    }
  } catch (error) {
    throw new Error(error);
  }
  throw new Error();
};
