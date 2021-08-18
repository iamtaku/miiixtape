import { parseYoutubeTime } from "../../../helpers/utils";
import { Collection, PlaylistInfo, Song, Tracks } from "../../../types/types";
import { YoutubePlaylistItem, YoutubePlaylistItemsSearch } from "youtube.ts";
import {
  YoutubeVideoSearchFull,
  YoutubeVideoSearchItemFull,
} from "../../types";

export const mapYoutubeToTrack = (data: YoutubeVideoSearchItemFull): Song => {
  return {
    id: data.id.toString(),
    name: data.snippet.title,
    service: "youtube",
    uri: data.id.toString(),
    time: parseYoutubeTime(data.contentDetails.duration),
    img: data.snippet.thumbnails.default.url,
  };
};

const mapYoutubePlaylistItemToTrack = (data: YoutubePlaylistItem): Song => {
  return {
    id: data.contentDetails.videoId,
    name: data.snippet.title,
    service: "youtube",
    uri: data.contentDetails.videoId,
    img: data.snippet.thumbnails.default.url,
  };
};

const mapYoutubePlaylisttoPlaylistInfo = (
  data: YoutubePlaylistItemsSearch
): PlaylistInfo => {
  return {
    id: data.items[0].id,
    name: data.items[0].snippet.title,
    isEditable: false,
    service: "youtube",
    type: "playlist",
    img: data.items[0].snippet.thumbnails.default.url,
  };
};

const validYoutube = (data: YoutubePlaylistItem) =>
  data.snippet.title !== "Private video";

export const mapYoutubeTrackstoTrack = (
  data: YoutubeVideoSearchFull
): Tracks => {
  const mapped: Tracks = data.items.map(mapYoutubeToTrack);
  return mapped;
};

export const mapYoutubePlaylistToPlaylist = ({
  playlist,
  dataTracks,
}: {
  playlist: YoutubePlaylistItemsSearch;
  dataTracks: YoutubePlaylistItem[];
}): Collection => {
  const playlistInfo = mapYoutubePlaylisttoPlaylistInfo(playlist);
  const tracks = dataTracks
    .filter(validYoutube)
    .map(mapYoutubePlaylistItemToTrack);
  return {
    playlistInfo,
    tracks,
    position: null,
  };
};
