import { parseYoutubeTime } from "../../../helpers/utils";
import { Song, Tracks } from "../../../types/types";

export const mapYoutubeToTrack = (data: any): Song => {
  return {
    id: data.id,
    name: data.snippet.title,
    service: "youtube",
    uri: data.id,
    time: parseYoutubeTime(data.contentDetails.duration),
  };
};

const mapYoutubePlaylistItemToTrack = (data: any): Song => {
  return {
    id: data.contentDetails.videoId,
    name: data.snippet.title,
    service: "youtube",
    uri: data.contentDetails.videoId,
  };
};

export const mapYoutubeTrackstoTrack = (data: any): Tracks => {
  const mapped: Tracks = data.items.map((item: any) => mapYoutubeToTrack(item));
  return mapped;
};

export const mapYoutubePlaylistToPlaylist = (data: any): Tracks => {
  const mapped: Tracks = data.map((item: any) =>
    mapYoutubePlaylistItemToTrack(item)
  );
  return mapped;
};
