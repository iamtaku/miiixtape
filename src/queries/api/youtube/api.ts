import axios from "axios";
import {
  mapYoutubePlaylistToPlaylist,
  mapYoutubeTrackstoTrack,
} from "./mapping";
import { responseBody } from "..";

const YOUTUBE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const youtubeInstance = axios.create({
  baseURL: YOUTUBE,
  params: {
    key: YOUTUBE_KEY,
  },
});

const youtubeRequests = {
  get: (url: string) => youtubeInstance.get(url).then(responseBody),
};

const fetchMultiple = async (id: string) => {
  const results: Promise<any>[] = [];
  let token = "";
  const tokenGen = (token: string) =>
    !!token.length ? `&pageToken=${token}` : "";
  do {
    let url =
      `playlistItems?part=contentDetails&part=snippet&maxResults=50&playlistId=${id}` +
      tokenGen(token);
    // debugger;
    const data = await youtubeRequests.get(url);
    results.push(...data.items);
    token = data.nextPageToken;
  } while (token);
  return results;
};

//if next page token, fetch again

export const Youtube = {
  getVideos: (ids: string[]) =>
    youtubeRequests.get(`${ids.join(",")}`).then(mapYoutubeTrackstoTrack),
  getVideo: (id: string) =>
    youtubeRequests
      .get(`videos?part=snippet%2CcontentDetails&id=${id}`)
      .then(mapYoutubeTrackstoTrack),
  getPlaylist: (id: string) =>
    fetchMultiple(id).then(mapYoutubePlaylistToPlaylist),
};
