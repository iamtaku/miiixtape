import Player from "../components/players/Player";
import { Song, Tracks } from "../types/types";
import { initialState, player } from "./context";
import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions =
  ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const nextTrack = (state: PlaybackType) => {
  if (state.playlistTracks) {
    console.log(state.playlistTracks[state.playbackPosition + 1]);

    return state.playlistTracks[state.playbackPosition + 1];
  }
  return undefined;
};

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  let newState: PlaybackType;
  switch (action.type) {
    case "PLAY_PLAYLIST":
      newState = {
        ...initialState.player,
        playlistTracks: action.payload.tracks,
        currentSong: action.payload.tracks[0],
        nextSong: action.payload.tracks[1],
        currentService: action.payload.tracks[0].service,
        nextService: action.payload.tracks[1]?.service,
        isPlaying: true,
      };
      return newState;
    case "PLAY_NEXT":
      newState = {
        ...state,
        playbackPosition: (state.playbackPosition += 1),
        currentSong: state.nextSong,
        currentService: state.nextService,
        isPlaying: true,
        nextSong: nextTrack(state),
        nextService: nextTrack(state)?.service,
      };
      console.log(newState);
      return newState;

    case "SONG_END":
      console.log(action.type);
      return {
        ...state,
        currentSong: state.nextSong,
        nextService: state.nextService,
        playbackPosition: (state.playbackPosition += 1),
      } as PlaybackType;
    case "PLAY":
      console.log("play");
      return {
        ...state,
        isPlaying: true,
      };
    case "PAUSE_CURRENT":
      console.log("pausing");
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};
