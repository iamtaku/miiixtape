import axios from "axios";
import { Collection, Tracks } from "../../../types/types";
import {
  mapYoutubePlaylistToPlaylist,
  mapYoutubeTrackstoTrack,
} from "./mapping";
import { YoutubePlaylistItem, YoutubePlaylistItemsSearch } from "youtube.ts";
import { YoutubeVideoSearchFull } from "../../types";

const YOUTUBE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const youtubeInstance = axios.create({
  baseURL: YOUTUBE,
  params: {
    key: YOUTUBE_KEY,
  },
});

const youtubeRequests = {
  get: <T>(url: string): Promise<T> =>
    youtubeInstance.get(url).then((data) => data.data),
};

const fetchMultiple = async (id: string) => {
  const dataTracks: YoutubePlaylistItem[] = [];
  let token = "";
  const tokenGen = (token: string) =>
    token.length ? `&pageToken=${token}` : "";
  do {
    const url =
      `playlistItems?part=contentDetails&part=snippet&maxResults=50&playlistId=${id}` +
      tokenGen(token);
    const data = await youtubeRequests.get<YoutubePlaylistItemsSearch>(url);
    dataTracks.push(...data.items);
    if (!data.nextPageToken) break;
    token = data.nextPageToken;
  } while (token);

  const playlist = await youtubeRequests.get<YoutubePlaylistItemsSearch>(
    `playlists?part=contentDetails&part=snippet&id=${dataTracks[0].snippet.playlistId}`
  );
  return { playlist, dataTracks };
};

//if next page token, fetch again

export const Youtube = {
  // getVideos: (ids: string[]): Promise<Tracks> =>
  //   youtubeRequests.get(`${ids.join(",")}`).then(mapYoutubeTrackstoTrack),
  getVideo: (id: string): Promise<Tracks> =>
    youtubeRequests
      .get<YoutubeVideoSearchFull>(
        `videos?part=snippet%2CcontentDetails&id=${id}`
      )
      .then(mapYoutubeTrackstoTrack),
  getPlaylist: (id: string): Promise<Collection> =>
    fetchMultiple(id).then(mapYoutubePlaylistToPlaylist),
};
