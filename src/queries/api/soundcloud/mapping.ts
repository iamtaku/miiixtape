import { Song, Tracks } from "../../../types/types";

export const mapSCTracktoTrack = (track: any): Song => {
  return {
    id: track.id,
    name: track.title,
    service: "soundcloud",
    uri: track.id,
    img: track.artwork_url,
    time: track.duration,
    href: track.permalink_url,
    artists: [{ uri: track.user.id, name: track.user.username }],
  };
};
