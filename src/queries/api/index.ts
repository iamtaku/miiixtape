import axios, { AxiosResponse } from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import {
  mapServerPlaylist,
  mapServerPlaylistMultiple,
  mapUserAttributes,
} from "./miiixtape/mappingHelpers";
import { Collection } from "../../types/types";
import {
  IPlaylistItem,
  IPlaylistItems,
  ServerPlaylist,
  UserAttributes,
} from "../types";
import { isAuthenticated } from "../../helpers/utils";
export { SoundCloud } from "./soundcloud/api";
export { Youtube } from "./youtube/api";
export * from "./spotify/api";
export * from "./miiixtape/api";

const SERVER = process.env.REACT_APP_BASE_URL;

const playlistInstance = axios.create({
  baseURL: SERVER,
});

const token = () => window.localStorage.getItem("token");

playlistInstance.interceptors.request.use((config) => {
  if (isAuthenticated()) {
    config.headers.Authorization = `Bearer ${token()}`;
  }
  return config;
});

export const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const requests = {
  get: (url: string) => playlistInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    playlistInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    playlistInstance.put(url, body).then(responseBody),
  delete: (url: string) => playlistInstance.delete(url).then(responseBody),
};

export const Playlist = {
  getUser: (): Promise<UserAttributes> =>
    requests.get("/users").then((data) => mapUserAttributes(data)),
  getPlaylists: (): Promise<Collection[]> =>
    requests.get("/playlists").then((data) => mapServerPlaylistMultiple(data)),
  getPlaylist: (
    id: string,
    _client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<Collection> =>
    requests.get(`/playlists/${id}`).then((data) => mapServerPlaylist(data)),
  createPlaylist: (playlist: {
    playlist: { name: string };
  }): Promise<ServerPlaylist> => requests.post("playlists", playlist),
  // updatePost: (post: PostType, id: number): Promise<PostType> =>
  //   requests.put(`posts/${id}`, post),
  deletePlaylist: (id: string): Promise<void> =>
    requests.delete(`playlists/${id}`),
  createPlaylistItems: (
    id: string,
    playlist_items: IPlaylistItems
  ): Promise<ServerPlaylist> =>
    requests.post(`/playlists/${id}/playlist_items`, playlist_items),
  deletePlaylistItem: (id: string) => requests.delete(`playlist_items/${id}`),
  patchPlaylistItem: (
    id: string,
    playlist_items: IPlaylistItem
  ): Promise<Collection> =>
    requests
      .put(`playlist_items/${id}`, playlist_items)
      .then(mapServerPlaylist),
};

export default playlistInstance;
