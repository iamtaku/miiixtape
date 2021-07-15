import axios from "axios";
import { responseBody } from "..";
import { Artist, Song, Tracks } from "../../../types/types";
import { mapSCArtistToArtist, mapSCTracktoTrack } from "./mapping";

const SOUNDCLOUD_KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;
const SOUNDCLOUD = `https://api.soundcloud.com`;

const soundcloudInstance = axios.create({
  baseURL: SOUNDCLOUD,
  params: {
    client_id: SOUNDCLOUD_KEY,
  },
});

export const soundcloudRequests = {
  get: (url: string) => soundcloudInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    soundcloudInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    soundcloudInstance.put(url, body).then(responseBody),
  delete: (url: string) => soundcloudInstance.delete(url).then(responseBody),
};

interface Soundcloud {
  tracks: any;
}

const fetchMultiple = async (data: string[], fetchFunction?: any) => {
  const results: Promise<any>[] = [];
  data.forEach((item) => results.push(fetchFunction(item)));
  return await Promise.all(results);
};

const fetchArtistInfo = async (id: string): Promise<any> => {
  const results: Promise<any>[] = [];
  const fetchFns = [`/users/${id}`, `/users/${id}/tracks&limit=50`];
  fetchFns.forEach((item) => results.push(soundcloudRequests.get(item)));
  return await Promise.all(results);
};

export const SoundCloud = {
  getTrackInfo: (url: string): Promise<Soundcloud> =>
    soundcloudRequests.get(`/resolve?url=${url}`).then((res) => res),
  getTrack: (id: string): Promise<Song> =>
    soundcloudRequests
      .get(`/tracks/${id}`)
      .then((res) => mapSCTracktoTrack(res)),
  getTracks: (uris: string[]): Promise<Tracks> =>
    fetchMultiple(uris, SoundCloud.getTrack),
  getArtist: (id: string): Promise<Artist> =>
    fetchArtistInfo(id).then((res) => mapSCArtistToArtist(res)),
};