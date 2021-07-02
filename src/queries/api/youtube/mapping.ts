import { Song, Tracks } from "../../../types/types";

export const mapYoutubeToTrack = (data: any): Song => {
  const res = data.items[0];
  return {
    id: res.id,
    name: res.snippet.title,
    service: "youtube",
    uri: res.id,
    // href: generateYoutubeURL(data.id),
  };
};

export const mapYoutubeTrackstoTrack = (data: any): Tracks => {
  const mapped: Tracks = data.items.map((item: any) => mapYoutubeToTrack(item));
  return mapped;
};
