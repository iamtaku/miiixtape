import axios, { AxiosResponse } from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import { mapServerPlaylist, mapToPlaylist } from "../helpers/mappingHelpers";
import { Playlist as PlaylistType, Tracks } from "../types/types";
import { ServerPlaylist, ServerPlaylists } from "./types";

const instance = () => {
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
  });
};

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance().get(url).then(responseBody),
  post: (url: string, body: {}) =>
    instance().post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance().put(url, body).then(responseBody),
  delete: (url: string) => instance().delete(url).then(responseBody),
};

export const Playlist = {
  getPlaylists: (): Promise<PlaylistType[]> =>
    requests.get("/playlists").then((data) => mapServerPlaylist(data)),
  getPlaylist: (
    id: string,
    client: SpotifyWebApi.SpotifyWebApiJs
  ): Promise<PlaylistType> =>
    requests
      .get(`/playlists/${id}`)
      .then((data) => mapToPlaylist(data, client)),
  createPlaylist: (playlist: {
    playlist: { name: string };
  }): Promise<ServerPlaylist> => requests.post("playlists", playlist),
  // updatePost: (post: PostType, id: number): Promise<PostType> =>
  //   requests.put(`posts/${id}`, post),
  deletePost: (id: string): Promise<void> => requests.delete(`playlists/${id}`),
};

interface IPlaylistItems {
  playlist_items: {
    songs: Tracks;
  };
}

export const PlaylistItems = {
  createPlaylistItems: (
    id: string,
    playlist_items: IPlaylistItems
  ): Promise<PlaylistType> =>
    requests.post(`/playlists/${id}/playlist_items`, playlist_items),
};

export default instance;
