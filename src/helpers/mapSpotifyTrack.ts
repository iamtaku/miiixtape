import { Album, Artists, Song } from "../types/types";

export const mapSpotifyTracktoTrack = (
  data: SpotifyApi.SingleTrackResponse | SpotifyApi.TrackObjectFull
): Song => {
  const album: Album = {
    name: data.album.name,
    uri: data.album.uri,
  };

  const artists: Artists = data.artists.map((artist) => ({
    name: artist.name,
    uri: artist.uri,
  }));

  return {
    name: data.name,
    id: data.id,
    service: "spotify",
    uri: data.uri,
    album,
    artists,
    img: data.album.images[0].url,
    time: data.duration_ms,
  };
};
