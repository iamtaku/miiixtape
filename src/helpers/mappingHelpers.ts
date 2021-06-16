import SpotifyWebApi from "spotify-web-api-js";
import { SoundCloud } from "../queries/api";
import {
  PlaylistItemItem,
  ServerPlaylist,
  ServerPlaylists,
  SongAttributes,
} from "../queries/types";
import {
  PlaylistInfo,
  Song,
  Collection,
  Tracks,
  Album,
  Artists,
  Service,
} from "../types/types";
import { stripURI } from "./stripURI";

const generateURL = (song: SongAttributes): string => {
  const YOUTUBE = "https://www.youtube.com/watch?v=";
  let URL = "";
  switch (song.service) {
    case "youtube":
      URL = `${YOUTUBE}${song.uri}`;
      break;
    default:
      break;
  }

  return URL;
};

export const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  let href = generateURL(item.attributes.song);

  return {
    id: item.id,
    name: item.attributes.song.name,
    service: item.attributes.song.service,
    uri: item.attributes.song.uri,
    playlistPosition: item.attributes.position,
    href,
  };
};

interface IHash {
  [title: string]: Song;
}

export const mapSCTracktoTrack = (track: any): Song => {
  return {
    id: track.id,
    name: track.title,
    service: "soundcloud",
    uri: track.id,
    img: track.artwork_url,
    time: track.duration,
    href: track.permalink_url,
    artists: [{ uri: track.user.id, name: "" }],
  };
};

export const mapServerPlaylist = (data: ServerPlaylists): Collection[] => {
  const mappedData: Collection[] = data.data.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.attributes.name,
        service: "plaaaylist",
      },
      tracks: [],
    };
  });
  return mappedData;
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

export const mapTrackToPlaylist = (track: Song): Collection => ({
  playlistInfo: { name: track.name, id: track.id, service: track.service },
  tracks: [{ ...track }],
});

export const generateServices = (tracks: Tracks): Service[] => {
  const servicesSet = new Set<Service>();
  tracks?.forEach((track) => servicesSet.add(track.service));
  return Array.from(servicesSet);
};
