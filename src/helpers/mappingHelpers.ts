import SpotifyWebApi from "spotify-web-api-js";
import { PlaylistItemItem, ServerPlaylist } from "../queries/types";
import { PlaylistInfo, Song, Playlist, Tracks } from "../types/types";
import { mapSpotifyTracktoTrack } from "./mapSpotifyTrack";
import { stripURI } from "./stripURI";

const mapPlaylistItemToTrack = (item: PlaylistItemItem): Song => {
  return {
    id: item.id,
    name: item.attributes.song.name,
    service: item.attributes.song.service,
    uri: item.attributes.song.uri,
    playlistPosition: item.attributes.position,
  };
};

const generateSpotifyHash = async (
  data: ServerPlaylist,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<IHash> => {
  const spotifyTracks = data.included.filter(
    (item) => item.attributes.song.service === "spotify"
  );
  //fetch them 50 at a time
  const spotifyURIS = spotifyTracks.map((track) => {
    return stripURI(track.attributes.song.uri);
  });
  if (!!spotifyURIS) throw Error("no uris");
  const res = await client.getTracks(spotifyURIS);
  const spotifyHash: IHash = {};

  res.tracks.forEach((track) => {
    debugger;
    const mapped = mapSpotifyTracktoTrack(track);
    spotifyHash[mapped.name] = mapped;
  });
  return spotifyHash;
};

interface IHash {
  [title: string]: Song;
}

export const mapToPlaylist = async (
  data: ServerPlaylist,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  const playlistInfo: PlaylistInfo = {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
    type: "playlist",
  };
  const spotifyHash = await generateSpotifyHash(data, client);

  const tracks = data.included.map((item) => {
    if (item.attributes.song.service === "spotify") {
      const res = spotifyHash[item.attributes.song.name];
      res.playlistPosition = item.attributes.position;
      return res;
    }
    return mapPlaylistItemToTrack(item);
  });

  return {
    playlistInfo,
    tracks,
  };
};
