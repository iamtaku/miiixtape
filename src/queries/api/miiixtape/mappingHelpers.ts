import {
  PlaylistItemItem,
  ServerPlaylist,
  ServerPlaylists,
  ServerUser,
  UserAttributes,
} from "../../types";
import {
  Song,
  Collection,
  Tracks,
  Service,
  PlaylistInfo,
} from "../../../types/types";

export const generateYoutubeURL = (uri: string): string => {
  const YOUTUBE = "https://www.youtube.com/watch?v=";
  return `${YOUTUBE}${uri}`;
};

export const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  let href =
    item.attributes.song.service === "youtube"
      ? generateYoutubeURL(item.attributes.song.uri)
      : "";
  return {
    id: item.id,
    name: item.attributes.song.name,
    service: item.attributes.song.service,
    uri: item.attributes.song.uri,
    playlistPosition: item.attributes.position,
    href,
  };
};

export const mapServerPlaylistMultiple = (
  data: ServerPlaylists
): Collection[] => {
  const mappedData: Collection[] = data.data.map((item) => {
    return {
      playlistInfo: {
        id: item.id,
        name: item.attributes.name,
        service: "plaaaylist",
        owner: item.relationships.user.data.id,
      },
      tracks: [],
    };
  });
  return mappedData;
};
export const mapTrackToPlaylist = (track: Song): Collection => ({
  playlistInfo: {
    name: track.name,
    id: track.id,
    service: track.service,
    owner: "",
  },
  tracks: [{ ...track }],
});

export const generateServices = (tracks: Tracks): Service[] => {
  const servicesSet = new Set<Service>();
  tracks?.forEach((track) => servicesSet.add(track.service));
  return Array.from(servicesSet);
};

export const mapUserAttributes = (data: ServerUser): UserAttributes => {
  return {
    ...data.data.attributes,
  };
};

export const mapPlaylistInfo = (data: ServerPlaylist): PlaylistInfo => {
  return {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
    owner: data.data.relationships.user.data.id,
    type: "playlist",
    service: "plaaaylist",
  };
};

export const mapServerPlaylist = (data: ServerPlaylist): Collection => {
  const playlistInfo = mapPlaylistInfo(data);
  if (data.included.length === 0) {
    return {
      playlistInfo,
      tracks: [],
    };
  }
  const tracks = data.included.map(mapPlaylistItemToTrack);
  return {
    playlistInfo,
    tracks,
  };
};
