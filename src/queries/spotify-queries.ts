import SpotifyWebApi from "spotify-web-api-js";
import {
  mapSpotifyAlbumtoPlaylist,
  mapSpotifyPlaylistToPlaylist,
  mapSpotifyToPlaylist,
} from "../helpers/mappingHelpers";
import { Collection as Playlist, Service } from "../types/types";
import { UserAttributes } from "./types";

export const getSpotifyAlbum = async (
  albumId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  try {
    const data = await client.getAlbum(albumId);
    return mapSpotifyAlbumtoPlaylist(data);
  } catch (error) {
    throw new Error(error);
  }
};
export const getSpotifyPlaylists = async (
  userInfo?: UserAttributes
): Promise<Playlist[]> => {
  if (userInfo?.access_token) {
    const client = new SpotifyWebApi();
    client.setAccessToken(userInfo?.access_token);
    try {
      const res = await client.getUserPlaylists();
      return mapSpotifyToPlaylist(res);
    } catch (err) {
      throw new Error(err);
    }
  }
  throw new Error("something wrong");
};

export const getSpotifyInfo = async (userInfo?: UserAttributes) => {
  if (!userInfo) throw new Error("auth failed");
  if (userInfo.access_token && userInfo.spotify_id) {
    try {
      const client = new SpotifyWebApi();
      client.setAccessToken(userInfo.access_token);
      return await client.getUser(userInfo.spotify_id);
    } catch (err) {
      throw new Error(err);
    }
  }
};

export interface AlbumParam {
  service: Service;
  albumId: string;
}
export const getAlbum = async (
  params: AlbumParam,
  userInfo?: UserAttributes
): Promise<Playlist> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  // switch (params.service) {
  // case "spotify":
  try {
    return await getSpotifyAlbum(params.albumId, client);
  } catch (err) {
    throw new Error(err);
  }
  // default:
  // throw new Error("something gone wrong");
  // }
};
export const getSingleSpotifyPlaylist = async (
  playlistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Playlist> => {
  try {
    const data = await client.getPlaylist(playlistId);
    return mapSpotifyPlaylistToPlaylist(data);
  } catch (error) {
    throw new Error(error);
  }
};
