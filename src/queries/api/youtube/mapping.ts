import { parseYoutubeTime } from "../../../helpers/utils";
import { Collection, PlaylistInfo, Song, Tracks } from "../../../types/types";

export const mapYoutubeToTrack = (data: any): Song => {
  return {
    id: data.id,
    name: data.snippet.title,
    service: "youtube",
    uri: data.id,
    time: parseYoutubeTime(data.contentDetails.duration),
    img: data.snippet.thumbnails.default.url,
  };
};

const mapYoutubePlaylistItemToTrack = (data: any): Song => {
  return {
    id: data.contentDetails.videoId,
    name: data.snippet.title,
    service: "youtube",
    uri: data.contentDetails.videoId,
    img: data.snippet.thumbnails.default.url,
  };
};

const mapYoutubePlaylisttoPlaylistInfo = (data: any): PlaylistInfo => {
  return {
    id: data.items[0].id,
    name: data.items[0].snippet.title,
    service: "youtube",
    type: "playlist",
    img: data.items[0].snippet.thumbnails.default.url,
  };
};

const validYoutube = (data: any) => data.snippet.title !== "Private video";

export const mapYoutubeTrackstoTrack = (data: any): Tracks => {
  const mapped: Tracks = data.items.map(mapYoutubeToTrack);
  return mapped;
};

export const mapYoutubePlaylistToPlaylist = (data: any): Collection => {
  const playlistInfo = mapYoutubePlaylisttoPlaylistInfo(data.playlist);
  const tracks = data.tracks
    .filter(validYoutube)
    .map(mapYoutubePlaylistItemToTrack);
  return {
    playlistInfo,
    tracks,
  };
};
