import SpotifyWebApi from "spotify-web-api-js";
import { mapSpotifyTracktoTrack } from "../helpers/mapSpotifyTrack";
import { Playlist, PlaylistInfo, Tracks } from "../types/types";

const mergeAlbumWithTrack = (
  track: SpotifyApi.TrackObjectSimplified,
  album: SpotifyApi.SingleAlbumResponse
): SpotifyApi.TrackObjectFull => {
  return {
    ...track,
    album,
    external_ids: {},
    popularity: album.popularity,
  };
};

const mapSpotifyAlbumtoPlaylist = (album: SpotifyApi.SingleAlbumResponse) => {
  console.log(album);

  const playlistInfo: PlaylistInfo = {
    id: album.id,
    name: album.name,
    external_urls: album.external_urls.spotify,
    img: album.images[0].url,
    service: "spotify",
    type: "album",
  };

  const tracks: Tracks = album.tracks.items.map((item) =>
    mapSpotifyTracktoTrack(mergeAlbumWithTrack(item, album))
  );

  return {
    playlistInfo,
    tracks,
  };
};

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
