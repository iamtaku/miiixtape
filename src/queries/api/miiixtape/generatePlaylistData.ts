import SpotifyWebApi from "spotify-web-api-js";
import { mapPlaylistItemToTrack } from "./mappingHelpers";
import { stripURI } from "../../../helpers/stripURI";
import { Collection, PlaylistInfo, Service, Song } from "../../../types/types";
import { SoundCloud } from "..";
import { ServerPlaylist } from "../../types";
import client, { Spotify } from "../spotify/api";
import { Youtube } from "../youtube/api";

const fetchSpotifyTracks = async (
  data: Song,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Song> => {
  const tracks = await Spotify.getTracks([stripURI(data.uri)], client);
  return tracks[0];
};

const fetchSCTracks = async (data: Song): Promise<Song> => {
  const res = await SoundCloud.getTrack(data.uri);
  return res;
};

const fetchYoutubeTracks = async (data: Song): Promise<Song> => {
  const res = await Youtube.getVideo(data.uri);
  return res[0];
};

const fetchAppropriateService = async (
  service: Service,
  data: Song,
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  switch (service) {
    case "spotify":
      return await fetchSpotifyTracks(data, client);
    case "soundcloud":
      return await fetchSCTracks(data);
    case "youtube":
      return await fetchYoutubeTracks(data);
    default:
      throw Error();
  }
};

const fetchTracks = async (
  data: Song,
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  return fetchAppropriateService(data.service, data, client);
};

interface IHash {
  [uri: string]: Song;
}

const generatePlaylistInfo = (data: ServerPlaylist): PlaylistInfo => {
  return {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
    owner: data.data.relationships.user.data.id,
    type: "playlist",
    service: "plaaaylist",
  };
};

export const generatePlaylistTracks = async (
  data: Song,
  token?: string
): Promise<Song> => {
  const trackHash: IHash = {};

  if (!token) throw Error();

  const fetchedTracks = await fetchTracks(data, client(token));
  // fetchedTracks.forEach((item) => {
  //   item?.forEach((track) => {
  //     if (track) {
  //       trackHash[track.uri] = track;
  //     }
  //   });
  // });
  // const tracks: Tracks = data.included.map((item) => {
  //   const track: Song = JSON.parse(
  //     JSON.stringify(trackHash[item.attributes.song.uri])
  //   );
  //   track.playlistPosition = item.attributes.position;
  //   track.id = item.id;
  //   return track;
  // });
  return {
    ...fetchedTracks,
    id: data.id,
  };
};

export const generatePlaylistData = async (
  data: ServerPlaylist,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Collection> => {
  const playlistInfo = generatePlaylistInfo(data);
  if (data.included.length === 0) {
    return {
      playlistInfo,
      tracks: [],
    };
  }
  // const tracks = await generatePlaylistTracks(data, client);
  const tracks = data.included.map(mapPlaylistItemToTrack);
  return {
    playlistInfo,
    tracks,
  };
};
