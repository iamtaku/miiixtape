import { Artist, PlaylistInfo, Song, Tracks } from "../../../types/types";

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

  const tracks: Tracks = dataTracks.map((item: any) => mapSCTracktoTrack(item));
  debugger;
  const data = {
    playlistInfo,
    tracks,
  };
  return { uri: playlistInfo.id, name: playlistInfo.name, data };
};
