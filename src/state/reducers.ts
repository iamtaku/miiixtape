import Player from "../components/players/Player";
import { Song, Tracks } from "../types/types";
import { initialState, player } from "./context";
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
  if (!state.previousSong) return state;
  const currentSong = state.previousSong;
  const nextSong = nextTrack(state.playlistTracks, currentSong);
  const previousSong = previousTrack(state.playlistTracks, currentSong);
  if (currentIndex(state.playlistTracks, currentSong) === 0) {
    return {
      ...state,
      currentSong,
      currentService: currentSong?.service,
      nextSong,
      nextService: nextSong?.service,
      previousSong: undefined,
    };
  } //return song of previous position
  return {
    ...state,
    currentSong,
    currentService: currentSong?.service,
    nextSong,
    nextService: nextSong?.service,
    previousSong,
  };
};

// const calcSpotifyPosition

const handlePlayNext = (state: PlaybackType) => {
  console.group("playing next...");
  console.log("before update,", state);
  if (!state.nextSong) return state;

  const currentSong = state.nextSong;
  const nextSong = nextTrack(state.playlistTracks, currentSong);
  const previousSong = previousTrack(state.playlistTracks, currentSong);
  const playBackPosition =
    currentSong.service === "spotify"
      ? (state.playbackPosition += 1)
      : state.playbackPosition;

  const newState = {
    ...state,
    currentSong,
    currentService: currentSong.service,
    isPlaying: true,
    nextSong,
    nextService: nextSong?.service,
    previousSong,
    playBackPosition,
  };

  console.log("new state...: ", newState);
  console.groupEnd();

  return newState;
};

const handlePlay = (state: PlaybackType) => ({ ...state, isPlaying: true });

const handlePause = (state: PlaybackType) => ({ ...state, isPlaying: false });

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
      return handlePlayNext(state);

    case "SONG_END":
      return {
        ...state,
        currentSong: state.nextSong,
        nextService: state.nextService,
        playbackPosition: (state.playbackPosition += 1),
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
