import {
  PlaylistItemItem,
  ServerPlaylists,
  ServerUser,
  UserAttributes,
} from "../../types";
import { Song, Collection, Tracks, Service } from "../../../types/types";

export const generateYoutubeURL = (uri: string): string => {
  const YOUTUBE = "https://www.youtube.com/watch?v=";
  return `${YOUTUBE}${uri}`;
};

export const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  let href = generateYoutubeURL(item.attributes.song.uri);
  debugger;
  return {
    id: item.id,
    name: item.attributes.song.name,
    service: item.attributes.song.service,
    uri: item.attributes.song.uri,
    playlistPosition: item.attributes.position,
    href,
  };
};

export const mapServerPlaylist = (data: ServerPlaylists): Collection[] => {
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
