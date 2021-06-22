import SpotifyWebApi from "spotify-web-api-js";
import {
  mapSpotifyAlbumtoPlaylist,
  mapSpotifyArtistToArtist,
  mapSpotifyPlaylistToPlaylist,
  mapSpotifyToPlaylist,
} from "../helpers/mappingHelpers";
import { Artist, Collection as Playlist, Service } from "../types/types";
import { UserAttributes } from "./types";

const fetchSpotifyArtistInfo = async (
  id: string,
  client: SpotifyWebApi.SpotifyWebApiJs
) => {
  const res: Promise<
    | SpotifyApi.SingleArtistResponse
    | SpotifyApi.ArtistsAlbumsResponse
    | SpotifyApi.ArtistsRelatedArtistsResponse
    | SpotifyApi.ArtistsTopTracksResponse
  >[] = [];

  // const fetchFunctions = ['getArtist','getArtistTopTracks','getArtistRelatedArtists','getArtistAlbums',]
  const fetchFunctions = [
    client.getArtist,
    client.getArtistTopTracks,
    client.getArtistRelatedArtists,
    client.getArtistAlbums,
  ];
  const options = {};
  fetchFunctions.forEach((fn) => res.push(fn(id)));
};

export const getSpotifyArtist = async (
  artistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<Artist> => {
  client.getArti;
  const data = await client.getArtist(artistId);
  return mapSpotifyArtistToArtist(data);
};

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
