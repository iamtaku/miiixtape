import { SoundcloudTrack } from "soundcloud.ts";
import { Artist, PlaylistInfo, Song, Tracks } from "../../../types/types";

export const mapSCTracktoTrack = (track: SoundcloudTrack): Song => {
  return {
    id: track.id.toString(),
    name: track.title,
    service: "soundcloud",
    uri: track.id.toString(),
    img: track.artwork_url,
    time: track.duration,
    href: track.permalink_url,
    artists: [{ uri: track.user.id.toString(), name: track.user.username }],
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapSCArtistToArtist = ([dataInfo, dataTracks]: any[]): Artist => {
  const playlistInfo: PlaylistInfo = {
    id: dataInfo.id,
    name: dataInfo.username,
    service: "soundcloud",
    description: dataInfo.description,
    external_urls: dataInfo.permalink_url,
    img: dataInfo.avatar_url,
    type: "artist",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tracks: Tracks = dataTracks.map((item: any) => mapSCTracktoTrack(item));
  const data = {
    playlistInfo,
    tracks,
  };
  return { uri: playlistInfo.id, name: playlistInfo.name, data };
};
