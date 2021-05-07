import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions = ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  switch (action.type) {
    case "PLAY_PLAYLIST":
      console.log("reducer was called, play_playlist");
      // console.log(action)
      return {
        ...state,
        playlistSongs: action.payload.tracks,
        currentSong: action.payload.tracks[0],
        nextSong: action.payload.tracks[1],
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
