import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import {
  mapServerPlaylist,
  mapServerPlaylistMultiple,
  mapUserAttributes,
} from "./miiixtape/mappingHelpers";
import { Collection } from "../../types/types";
import { PlaylistItems, ServerPlaylistItem, UserAttributes } from "../types";
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

const requests = {
  get: (url: string) => playlistInstance.get(url).then((data) => data.data),
  post: (url: string, body: Record<string, unknown>) =>
    playlistInstance.post(url, body).then((data) => data.data),
  put: (url: string, body: Record<string, unknown>) =>
    playlistInstance.put(url, body).then((data) => data.data),
  delete: (url: string) =>
    playlistInstance.delete(url).then((data) => data.data),
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
  }): Promise<Collection> =>
    requests.post("playlists", playlist).then(mapServerPlaylist),
  // updatePost: (post: PostType, id: number): Promise<PostType> =>
  //   requests.put(`posts/${id}`, post),
  deletePlaylist: (id: string): Promise<void> =>
    requests.delete(`playlists/${id}`),
  createPlaylistItems: (
    id: string,
    playlist_items: PlaylistItems
  ): Promise<Collection> =>
    requests
      .post(`/playlists/${id}/playlist_items`, playlist_items)
      .then(mapServerPlaylist),
  deletePlaylistItem: (id: string): Promise<void> =>
    requests.delete(`playlist_items/${id}`),
  patchPlaylistItem: (
    id: string,
    playlist_items: ServerPlaylistItem
  ): Promise<Collection> =>
    requests
      .put(`playlist_items/${id}`, playlist_items)
      .then(mapServerPlaylist),
};

export default playlistInstance;
