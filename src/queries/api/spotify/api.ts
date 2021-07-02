import SpotifyWebApi from "spotify-web-api-js";
import {
  mapSpotifyAlbumtoPlaylist,
  mapSpotifyArtistToArtist,
  mapSpotifyPlaylistToPlaylist,
  mapSpotifyToPlaylist,
} from "./mapping";
import { UserAttributes } from "../../types";
import { Artist, Service, Collection } from "../../../types/types";

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

export interface AlbumParam {
  service: Service;
  albumId: string;
}

export const getAlbum = async (
  params: AlbumParam,
  userInfo?: UserAttributes
): Promise<Collection> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  return await Spotify.getAlbum(params.albumId, client(userInfo.access_token));
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
};

const client = (accessToken: string): SpotifyWebApi.SpotifyWebApiJs => {
  const client = new SpotifyWebApi();
  client.setAccessToken(accessToken);
  return client;
};

export default client;
