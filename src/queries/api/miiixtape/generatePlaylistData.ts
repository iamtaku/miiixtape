import SpotifyWebApi from "spotify-web-api-js";
import {
  generateServices,
  mapPlaylistItemToTrack,
} from "../../../helpers/mappingHelpers";
import { stripURI } from "../../../helpers/stripURI";
import {
  Collection,
  PlaylistInfo,
  Service,
  Song,
  Tracks,
} from "../../../types/types";
import { SoundCloud } from "..";
import { mapSpotifyTracktoTrack } from "../spotify/mapping";
import { PlaylistItemItem, ServerPlaylist } from "../../types";

const filterTracks = (data: PlaylistItemItem[], service: Service) =>
  data.filter((item) => item.attributes.song.service === service);

const removeDuplicate = (data: any): string[] => Array.from(new Set(data));

const fetchAllSpotifyTracks = async (
  uris: string[],
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  const NUM_TIMES = 50;
  const results: Promise<SpotifyApi.MultipleTracksResponse>[] = [];
  for (let i = 0; i < uris.length; i += NUM_TIMES) {
    results.push(client.getTracks(uris.slice(i, i + NUM_TIMES)));
  }
  return await Promise.all(results);
};

const fetchSpotifyTracks = async (
  data: PlaylistItemItem[],
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Tracks> => {
  const spotifyTracks = removeDuplicate(
    filterTracks(data, "spotify").map((track) =>
      stripURI(track.attributes.song.uri)
    )
  ); //fetch them 50 at a time
  const res = await fetchAllSpotifyTracks(spotifyTracks, client);
  const tracks: Tracks = [];
  res.forEach((item) =>
    item.tracks.forEach((track) => {
      const mapped = mapSpotifyTracktoTrack(track);
      tracks.push(mapped);
    })
  );
  return tracks;
};

const fetchSCTracks = async (data: PlaylistItemItem[]): Promise<Tracks> => {
  const soundcloudTracks = filterTracks(data, "soundcloud");
  const uris = soundcloudTracks.map((item) => item.attributes.song.uri);
  const res = await SoundCloud.getTracks(uris);
  // const tracks: Tracks = [];
  // res.forEach((track) => {
  // const mapped = mapSCTracktoTrack(track);
  // tracks.push(mapped);
  // });

  // return tracks;
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
    if (["spotify", "soundcloud"].includes(item.attributes.song.service)) {
      const track: Song = JSON.parse(
        JSON.stringify(trackHash[item.attributes.song.uri])
      );
      track.playlistPosition = item.attributes.position;
      track.id = item.id;
      return track;
    }
    return mapPlaylistItemToTrack(item);
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
  const tracks = await generatePlaylistTracks(data, client);
  return {
    playlistInfo,
    tracks,
  };
};
