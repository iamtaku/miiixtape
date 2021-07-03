import { PlaylistItemItem, ServerPlaylists } from "../queries/types";
import {
  PlaylistInfo,
  Song,
  Collection,
  Tracks,
  Album,
  Artists,
  Service,
  Artist,
} from "../types/types";

export const generateYoutubeURL = (uri: string): string => {
  const YOUTUBE = "https://www.youtube.com/watch?v=";
  return `${YOUTUBE}${uri}`;
};

export const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  let href = generateYoutubeURL(item.attributes.song.uri);

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
      },
      tracks: [],
    };
  });
  return mappedData;
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
