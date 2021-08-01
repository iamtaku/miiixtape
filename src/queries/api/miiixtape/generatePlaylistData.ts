import SpotifyWebApi from "spotify-web-api-js";
import { generateServices, mapPlaylistItemToTrack } from "./mappingHelpers";
import { stripURI } from "../../../helpers/stripURI";
import {
  Collection,
  PlaylistInfo,
  Service,
  Song,
  Tracks,
} from "../../../types/types";
import { SoundCloud } from "..";
import { PlaylistItemItem, ServerPlaylist } from "../../types";
import { Spotify } from "../spotify/api";
import { Youtube } from "../youtube/api";

const filterTracks = (data: PlaylistItemItem[], service: Service) =>
  data.filter((item) => item.attributes.song.service === service);

const removeDuplicate = (data: any): string[] => Array.from(new Set(data));

const fetchSpotifyTracks = async (
  data: PlaylistItemItem[],
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Tracks> => {
  const spotifyTracks = removeDuplicate(
    filterTracks(data, "spotify").map((track) =>
      stripURI(track.attributes.song.uri)
    )
  ); //fetch them 50 at a time
  const tracks = Spotify.getTracks(spotifyTracks, client);
  return tracks;
};

const fetchSCTracks = async (data: PlaylistItemItem[]): Promise<Tracks> => {
  const soundcloudTracks = filterTracks(data, "soundcloud");
  const uris = soundcloudTracks.map((item) => item.attributes.song.uri);
  const res = SoundCloud.getTracks(uris);
  return res;
};

const fetchYoutubeTracks = async (
  data: PlaylistItemItem[]
): Promise<Tracks> => {
  const youtubeTracks = filterTracks(data, "youtube");
  const uris = youtubeTracks.map((item) => item.attributes.song.uri).join(",");
  const res = Youtube.getVideo(uris);
  return res;
};

const fetchAppropriateService = async (
  service: Service,
  data: PlaylistItemItem[],
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  switch (service) {
    case "spotify":
      return fetchSpotifyTracks(data, client);
    case "soundcloud":
      return fetchSCTracks(data);
    case "youtube":
      return fetchYoutubeTracks(data);
    default:
      break;
  }
};

const fetchTracks = async (
  data: PlaylistItemItem[],
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  const tempTracks = data.map((item) => item.attributes.song);
  const services = generateServices(tempTracks);
  const results: Promise<Tracks | undefined>[] = [];
  services.forEach((service) => {
    results.push(fetchAppropriateService(service, data, client));
  });

  return await Promise.all(results);
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

const generatePlaylistTracks = async (
  data: ServerPlaylist,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Tracks> => {
  const trackHash: IHash = {};
  const fetchedTracks = await fetchTracks(data.included, client);
  fetchedTracks.forEach((item) => {
    item?.forEach((track) => {
      if (track) {
        trackHash[track.uri] = track;
      }
    });
  });
  const tracks: Tracks = data.included.map((item) => {
    const track: Song = JSON.parse(
      JSON.stringify(trackHash[item.attributes.song.uri])
    );
    track.playlistPosition = item.attributes.position;
    track.id = item.id;
    return track;
  });
  return tracks;
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
  // try {
  const tracks = await generatePlaylistTracks(data, client);
  return {
    playlistInfo,
    tracks,
  };
  // } catch (err) {
  // throw new Error(err);
  // }
};
