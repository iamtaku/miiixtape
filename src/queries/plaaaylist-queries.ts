import SpotifyWebApi from "spotify-web-api-js";
import {
  Playlist as PlaylistType,
  PlaylistParam,
  Tracks,
} from "../types/types";
import api, { Playlist, PlaylistItems } from "./api";
import { getSingleSpotifyPlaylist } from "./spotify-queries";
import { ServerTokenResponse, UserAttributes } from "./types";

export const getPlaaaylist = async (
  playlistId: string,
  client: SpotifyWebApi.SpotifyWebApiJs
): Promise<PlaylistType> => {
  try {
    return await Playlist.getPlaylist(playlistId, client);
  } catch (error) {
    throw new Error(error);
  }
};

export const getPlaylist = async (
  params: PlaylistParam,
  userInfo?: UserAttributes
): Promise<PlaylistType> => {
  const token = window.localStorage.getItem("token");
  if (!token || !userInfo) {
    throw new Error("auth error");
  }
  const client = new SpotifyWebApi();
  client.setAccessToken(userInfo?.access_token);

  switch (params.service) {
    case "plaaaylist":
      return await getPlaaaylist(params.playlistId, client);
    case "spotify":
      return await getSingleSpotifyPlaylist(params.playlistId, client);
    default:
      throw new Error("something gone wrong");
  }
};

export type Token = string;
export const getToken = async (): Promise<Token> => {
  //if we have a token in localstorage return it
  const token = window.localStorage.getItem("token");
  if (token) {
    return token;
  } //otherwise, fetch a token

  const code = window.location.search;
  if (code && !token) {
    try {
      const data = await api().get<ServerTokenResponse>(`/callback/${code}`);
      window.localStorage.setItem("token", data.data.token);
      window.history.replaceState(null, "new page title", "/app");
      return data.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }

  throw new Error("no token");
};

export const getUser = async (token?: string) => {
  try {
    const data = await api().get("/users");
    return data.data.data.attributes;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllPlaylists = async (): Promise<PlaylistType[]> => {
  try {
    return await Playlist.getPlaylists();
  } catch (error) {
    throw new Error(error);
  }
};

export const postPlaylistItems = async ({
  id,
  tracks,
}: {
  id: string;
  tracks: Tracks;
}) => {
  const body = {
    playlist_items: {
      songs: tracks,
    },
  };

  return await PlaylistItems.createPlaylistItems(id, body);
};

export const postPlaylist = async (name: string) => {
  const payload = {
    playlist: {
      name,
    },
  };

  try {
    return await Playlist.createPlaylist(payload);
  } catch (err) {
    throw new Error(err);
  }
};
