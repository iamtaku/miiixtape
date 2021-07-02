import { stripURI } from "../../../helpers/stripURI";
import {
  Album,
  Artist,
  Artists,
  Collection,
  PlaylistInfo,
  Song,
  Tracks,
} from "../../../types/types";

export const mapSpotifyArtistToArtist = (
  data: SpotifyApi.SingleArtistResponse
): Artist => {
  debugger;
  return {
    data: {
      playlistInfo: {
        id: data.id,
        name: data.name,
        service: "spotify",
        img: data.images[0].url,
        type: "artist",
      },
      tracks: [],
    },
    name: data.name,
    uri: data.uri,
  };
};

export const mapSpotifyToPlaylist = (
  data: SpotifyApi.ListOfUsersPlaylistsResponse
): Collection[] => {
  const mappedData: Collection[] = data.items.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.name,
        service: "spotify",
      },
      tracks: [],
    };
  });
  return mappedData;
};
export const mergeAlbumWithTrack = (
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

export const mapSpotifyAlbumtoPlaylist = (
  album: SpotifyApi.SingleAlbumResponse
) => {
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

export const mapSpotifyTracktoTrack = (
  data: SpotifyApi.SingleTrackResponse | SpotifyApi.TrackObjectFull,
  index?: number
): Song => {
  const album: Album = {
    name: data.album.name,
    uri: stripURI(data.album.uri),
  };

  const artists: Artists = data.artists.map((artist) => ({
    name: artist.name,
    uri: stripURI(artist.uri),
  }));
  return {
    name: data.name,
    id: data.id + index,
    service: "spotify",
    uri: data.uri,
    album,
    artists,
    img: data.album.images[0].url,
    time: data.duration_ms,
    href: data.external_urls.spotify,
  };
};

export const mapSpotifyPlaylistToPlaylist = (
  data: SpotifyApi.SinglePlaylistResponse
): Collection => {
  const playlistInfo: PlaylistInfo = {
    id: data.id,
    name: data.name,
    description: data.description ? data.description : "",
    external_urls: data.external_urls.spotify || "",
    img: data.images[0] ? data.images[0].url : "",
    type: "playlist",
    service: "spotify",
  };
  const tracks: Song[] = data.tracks.items.map((item, index) => {
    const newItem = item.track as SpotifyApi.TrackObjectFull;
    return mapSpotifyTracktoTrack(newItem, index);
  });

  return {
    playlistInfo,
    tracks,
  };
};
