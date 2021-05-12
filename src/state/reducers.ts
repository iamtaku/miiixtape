import Player from "../components/players/Player";
import { Song, Tracks } from "../types/types";
import { initialState, player } from "./context";
import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions =
  ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const nextTrack = (tracks: Tracks, playbackPosition: number) => {
  return tracks[playbackPosition + 1];
};

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  switch (action.type) {
    case "PLAY_PLAYLIST":
      console.log(action.type);
      return {
        ...state,
        playlistTracks: action.payload.tracks,
        currentSong: action.payload.tracks[0],
        nextSong: nextTrack(action.payload.tracks, state.playbackPosition),
        currentService: action.payload.tracks[0].service,
        nextService: nextTrack(action.payload.tracks, state.playbackPosition)
          ?.service,
        isPlaying: true,
      };
    case "PLAY_NEXT":
      console.log(action.type);
      // if (!state.nextSong) {
      //   console.log("no more songs");
      //   // return player as PlaybackType;
      //   return {
      //     ...player,
      //     current
      //   }
      // }

      const newState = {
        ...state,
        playbackPosition: (state.playbackPosition += 1),
        currentSong: state.nextSong,
        currentService: state.nextService,
        isPlaying: true,
        nextSong: nextTrack(state.playlistTracks, state.playbackPosition),
        nextService: nextTrack(state.playlistTracks, state.playbackPosition)
          ?.service,
      };
      return newState as PlaybackType;

    // return {
    //   ...state,
    //   playbackPosition: (state.playbackPosition += 1),
    //   currentSong: state.nextSong,
    //   currentService: state.nextService,
    //   nextSong: nextTrack(state.playlistTracks, state.playbackPosition),
    //   nextService: nextTrack(state.playlistTracks, state.playbackPosition)
    //     ?.service,
    // } as PlaybackType;

    case "SONG_END":
      console.log(action.type, state.nextSong);
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
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};
