import SpotifyWebApi from "spotify-web-api-js";
import {
  flattenSpotifyTracks,
  mapSpotifyAlbumtoPlaylist,
  mapSpotifyArtistToArtist,
  mapSpotifyPlaylistToPlaylist,
  mapSpotifyToPlaylist,
  mapSpotifyTrackstoTracks,
} from "./mapping";
import { BaseParams, UserAttributes } from "../../types";
import { Artist, Service, Collection, Tracks } from "../../../types/types";

export const getSpotifyPlaylists = async (
  userInfo?: UserAttributes
): Promise<Collection[]> => {
  if (userInfo?.access_token) {
    return await Spotify.getUserPlaylists(client(userInfo.access_token));
  }
  throw new Error("something wrong");
};

export const getSpotifyInfo = async (userInfo?: UserAttributes) => {
  if (!userInfo) throw new Error("spotify auth failed");
  if (userInfo.access_token && userInfo.spotify_id) {
    return await Spotify.getUser(
      userInfo.spotify_id,
      client(userInfo.access_token)
    );
  }
};

export const getAlbum = async (
  params: BaseParams,
  userInfo?: UserAttributes
): Promise<Collection> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  return await Spotify.getAlbum(params.id, client(userInfo.access_token));
};
export const getSingleSpotifyPlaylist = async (
  playlistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Collection> => {
  try {
    const data = await client.getPlaylist(playlistId);
    return mapSpotifyPlaylistToPlaylist(data);
  } catch (error) {
    throw new Error(error);
  }
};

const fetchAllSpotifyTracks = async (
  uris: string[],
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  const NUM_TIMES = 50;
  const results: Promise<SpotifyApi.MultipleTracksResponse>[] = [];
  for (let i = 0; i < uris.length; i += NUM_TIMES) {
    results.push(client.getTracks(uris.slice(i, i + NUM_TIMES)));
  }
  return await Promise.all(results).then((res) => flattenSpotifyTracks(res));
};

export const Spotify = {
  getPlaylist: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Collection> =>
    client.getPlaylist(id).then((data) => mapSpotifyPlaylistToPlaylist(data)),
  getArtist: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Artist> =>
    client.getArtist(id).then((data) => mapSpotifyArtistToArtist(data)),
  getAlbum: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Collection> =>
    client.getAlbum(id).then((data) => mapSpotifyAlbumtoPlaylist(data)),
  getUserPlaylists: (
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Collection[]> =>
    client.getUserPlaylists().then((data) => mapSpotifyToPlaylist(data)),
  getUser: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<SpotifyApi.UserProfileResponse> => client.getUser(id),
  getTracks: (
    uris: string[],
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Tracks> =>
    fetchAllSpotifyTracks(uris, client).then((res) =>
      mapSpotifyTrackstoTracks(res)
    ),
};

const client = (accessToken: string): SpotifyWebApi.SpotifyWebApiJs => {
  const client = new SpotifyWebApi();
  client.setAccessToken(accessToken);
  return client;
};

export default client;
