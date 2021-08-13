import axios from "axios";
import { Artist, Song } from "../../../types/types";
import { mapSCTracktoTrack } from "./mapping";

const SOUNDCLOUD_KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;
const SOUNDCLOUD = `https://api.soundcloud.com`;
// const NUM_TIMES = 9;

const soundcloudInstance = axios.create({
  baseURL: SOUNDCLOUD,
  params: {
    client_id: SOUNDCLOUD_KEY,
  },
});

const soundcloudRequests = {
  get: (url: string) => soundcloudInstance.get(url).then((data) => data.data),
  post: (url: string, body: Record<string, unknown>) =>
    soundcloudInstance.post(url, body).then((data) => data.data),
  put: (url: string, body: Record<string, unknown>) =>
    soundcloudInstance.put(url, body).then((data) => data.data),
  delete: (url: string) =>
    soundcloudInstance.delete(url).then((data) => data.data),
};

// const fetchMultiple = async (data: string[], fetchFunction: any) => {
//   const results: Promise<any>[] = [];
//   data.forEach((item) => results.push(fetchFunction(item)));
//   // for (let i = 0; i < data.length; i += NUM_TIMES) {
//   //   const sliced = data.slice(i, i + NUM_TIMES);
//   //   results.push(soundcloudRequests.get(`/tracks?ids=${sliced.join(",")}`));
//   // }
//   return Promise.all(results);
// };

// const fetchArtistInfo = async (_id: string): Promise<SoundcloudUser> => {
//   // const results: Promise<any>[] = [];
//   // const fetchFns = [`/users/${id}`, `/users/${id}/tracks&limit=50`];
//   // fetchFns.forEach((item) => results.push(soundcloudRequests.get(item)));
//   // return Promise.all(results);
//   return {} as SoundcloudUser;
// };

export const SoundCloud = {
  getTrackInfo: <T>(url: string): Promise<T> =>
    soundcloudRequests.get(`/resolve?url=${url}`).then((res) => res),
  getTrack: (id: string): Promise<Song> =>
    soundcloudRequests.get(`/tracks/${id}`).then(mapSCTracktoTrack),
  // getTracks: (uris: string[]): Promise<Tracks> =>
  //   fetchMultiple(uris, SoundCloud.getTrack),
  // soundcloudRequests.get(`/tracks?ids=${uris.join(",")}`),
  // fetchMultiple(uris).then((res) => res),
  getArtist: (_id: string): Promise<Artist> => {
    return Promise.resolve({} as Artist);
  },
  //   // eslint-disable-next-line
  //   fetchArtistInfo(id).then(mapSCArtistToArtist),
};
