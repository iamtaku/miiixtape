import axios, { AxiosResponse } from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import { mapServerPlaylist } from "../helpers/mappingHelpers";
import { fetchSinglePlaylist } from "./fetchSinglePlaylist";
import { Collection as PlaylistType, Tracks } from "../types/types";
import { ServerPlaylist } from "./types";

const KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;
const SOUNDCLOUD = `https://api.soundcloud.com`;
const SERVER = process.env.REACT_APP_BASE_URL;

interface IPlaylistItems {
  playlist_items: {
    songs: Tracks;
  };
}

const playlistInstance = () => {
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.create({
    baseURL: SERVER,
    headers,
  });
};

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => playlistInstance().get(url).then(responseBody),
  post: (url: string, body: {}) =>
    playlistInstance().post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    playlistInstance().put(url, body).then(responseBody),
  delete: (url: string) => playlistInstance().delete(url).then(responseBody),
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
      .then((data) => fetchSinglePlaylist(data, client)),
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

const soundcloudInstance = axios.create({
  baseURL: SOUNDCLOUD,
  params: {
    client_id: KEY,
  },
});

const soundcloudRequests = {
  get: (url: string) => soundcloudInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    soundcloudInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    soundcloudInstance.put(url, body).then(responseBody),
  delete: (url: string) => soundcloudInstance.delete(url).then(responseBody),
};

interface Soundcloud {}

const fetchMultiple = async (data: string[], fetchFunction?: any) => {
  const results: Promise<any>[] = [];
  data.forEach((item) => results.push(fetchFunction(item)));
  return await Promise.all(results);
};

export const SoundCloud = {
  getTrackInfo: (url: string): Promise<Soundcloud> =>
    soundcloudRequests.get(`/resolve?url=${url}`).then((res) => res),
  getTrack: (id: string): Promise<Soundcloud> =>
    soundcloudRequests.get(`/tracks/${id}`).then((res) => res),
  getTracks: (uris: string[]): Promise<Soundcloud[]> =>
    fetchMultiple(uris, SoundCloud.getTrack).then((res) => res),
};

export default playlistInstance;
