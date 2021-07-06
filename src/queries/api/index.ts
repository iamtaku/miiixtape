import axios, { AxiosResponse } from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import {
  mapServerPlaylist,
  mapUserAttributes,
} from "./miiixtape/mappingHelpers";
import { Collection as PlaylistType, Tracks } from "../../types/types";
import { ServerPlaylist, UserAttributes } from "../types";
import { generatePlaylistData } from "./miiixtape/generatePlaylistData";
export { SoundCloud } from "./soundcloud/api";
export { Youtube } from "./youtube/api";
export * from "./spotify/api";
export * from "./miiixtape/api";

const SERVER = process.env.REACT_APP_BASE_URL;

interface IPlaylistItems {
  playlist_items: {
    songs: Tracks;
  };
}

const token = window.localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const playlistInstance = axios.create({
  baseURL: SERVER,
  headers,
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
  getPlaylists: (): Promise<PlaylistType[]> =>
    requests.get("/playlists").then((data) => mapServerPlaylist(data)),
  getPlaylist: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<PlaylistType> =>
    requests
      .get(`/playlists/${id}`)
      .then((data) => generatePlaylistData(data, client)),
  createPlaylist: (playlist: {
    playlist: { name: string };
  }): Promise<ServerPlaylist> => requests.post("playlists", playlist),
  // updatePost: (post: PostType, id: number): Promise<PostType> =>
  //   requests.put(`posts/${id}`, post),
  deletePost: (id: string): Promise<void> => requests.delete(`playlists/${id}`),
  createPlaylistItems: (
    id: string,
    playlist_items: IPlaylistItems
  ): Promise<PlaylistType> =>
    requests.post(`/playlists/${id}/playlist_items`, playlist_items),
};

export default playlistInstance;
