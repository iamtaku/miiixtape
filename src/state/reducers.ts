import { Song } from "../types/types";
import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions = ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const hasNextTrack = (tracks: Song[]) => (tracks[1] ? tracks[1] : undefined);
// tracks.length > 1;
export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  switch (action.type) {
    case "PLAY_PLAYLIST":
      console.log("reducer was called, play_playlist");

      return {
        ...state,
        playlistSongs: action.payload.tracks,
        currentSong: action.payload.tracks[0],
        nextSong: hasNextTrack(action.payload.tracks),
        currentService: action.payload.tracks[0].service,
        nextService: action.payload.tracks[1].service,
        isPlaying: true,
      };
    case "SET_CURRENT_PLAYING":
      return {
        ...state,
      };
    default:
      return state;
  }
};
