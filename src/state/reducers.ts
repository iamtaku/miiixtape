import { Song, Tracks } from "../types/types";
import { player as initial } from "./context";
import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions =
  ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const currentIndex = (tracks?: Tracks, currentSong?: Song) => {
  if (currentSong && tracks) {
    return currentSong && tracks?.indexOf(currentSong);
  }
  return -1;
};

const nextTrack = (tracks?: Tracks, currentSong?: Song) => {
  if (tracks && currentSong) {
    const index = currentIndex(tracks, currentSong);
    if (index >= 0) return tracks[index + 1];
  }

  return undefined;
};

const previousTrack = (tracks?: Tracks, currentSong?: Song) => {
  const index = currentIndex(tracks, currentSong);
  if (index && tracks) {
    return tracks[index - 1];
  }
};

const handlePlayPrevious = (state: PlaybackType) => {
  console.group("playing previous...");
  console.log("prev state: ", state);
  if (!state.previousSong) return state;
  const currentSong = state.previousSong;
  const nextSong = nextTrack(state.currentPlaylist.tracks, currentSong);
  const previousSong = previousTrack(state.currentPlaylist.tracks, currentSong);
  if (currentIndex(state.currentPlaylist.tracks, currentSong) === 0) {
    return {
      ...state,
      currentSong,
      currentService: currentSong?.service,
      nextSong,
      nextService: nextSong?.service,
      previousSong: undefined,
    };
  } //return song of previous position

  const newState = {
    ...state,
    currentSong,
    currentService: currentSong?.service,
    nextSong,
    nextService: nextSong?.service,
    previousSong,
  };
  console.log("new state... : ", newState);
  console.groupEnd();
  return newState;
};

const handleSetNext = (state: PlaybackType) => {
  console.group("setting next...");
  console.log("before update,", state);

  if (!state.nextSong) return state;

  const currentSong = state.nextSong;
  const nextSong = nextTrack(state.currentPlaylist.tracks, currentSong);
  const previousSong = previousTrack(state.currentPlaylist.tracks, currentSong);
  const playBackPosition =
    currentSong.service === "spotify"
      ? (state.playbackPosition += 1)
      : state.playbackPosition;

  const newState = {
    ...state,
    currentSong,
    currentService: currentSong.service,
    nextSong,
    nextService: nextSong?.service,
    previousSong,
    playBackPosition,
    isPlaying: false,
  };

  console.log("new state...: ", newState);
  console.groupEnd();

  return newState;
};

const handlePlay = (state: PlaybackType) => {
  if (state.nextSong) {
    return { ...state, isPlaying: true, isFinished: true };
  }
  return state;
};

const handlePause = (state: PlaybackType) => ({ ...state, isPlaying: false });

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  let newState: PlaybackType;
  switch (action.type) {
    case "PLAY_PLAYLIST":
      if (action.payload.playlist.tracks.length > 0) {
        newState = {
          ...initial,
          currentPlaylist: action.payload.playlist,
          currentSong: action.payload.playlist?.tracks[0],
          nextSong: action.payload.playlist?.tracks[1],
          currentService: action.payload.playlist.tracks[0].service,
          nextService: action.payload.playlist.tracks[1]?.service,
          isPlaying: true,
        };
        return newState;
      }

      return state;
    case "SET_NEXT":
      return handleSetNext(state);
    case "SONG_END":
      return {
        ...state,
        isPlaying: false,
        isFinished: true,
      } as PlaybackType;
    case "PLAY":
      return handlePlay(state);
    case "PAUSE_CURRENT":
      return handlePause(state);
    case "PLAY_PREVIOUS":
      return handlePlayPrevious(state);

    default:
      return state;
  }
};
