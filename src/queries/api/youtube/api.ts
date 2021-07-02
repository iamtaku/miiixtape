import axios from "axios";
import { mapYoutubeToTrack, mapYoutubeTrackstoTrack } from "./mapping";
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

export const Youtube = {
  getVideos: (ids: string[]) =>
    youtubeRequests
      .get(`${ids.join(",")}`)
      .then((res) => mapYoutubeTrackstoTrack(res)),
  getVideo: (id: string) =>
    youtubeRequests
      .get(`videos?part=snippet%2CcontentDetails&id=${id}`)
      .then((res) => mapYoutubeToTrack(res)),
};
