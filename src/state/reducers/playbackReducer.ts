import { Collection, Song, Tracks } from "../../types/types";
import { player as initial } from "../context";
import { ActionMap, PlaybackPayload, PlaybackType } from "../types";

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
  const nextSong = nextTrack(state.currentCollection?.tracks, currentSong);
  const previousSong = previousTrack(
    state.currentCollection?.tracks,
    currentSong
  );
  if (currentIndex(state.currentCollection?.tracks, currentSong) === 0) {
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

  if (!state.nextSong) {
    console.log("no next song", state);
    console.groupEnd();
    return state;
  }

  const currentSong = state.nextSong;
  const nextSong = nextTrack(state.currentCollection?.tracks, currentSong);
  const previousSong = previousTrack(
    state.currentCollection?.tracks,
    currentSong
  );
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
  };

  console.log("new state...: ", newState);
  console.groupEnd();

  return newState;
};

const handlePlay = (state: PlaybackType) => {
  console.log("playing!");
  return { ...state, isPlaying: true, isFinished: false };
};

const handlePause = (state: PlaybackType) => ({ ...state, isPlaying: false });

const handlePlayTrack = (state: PlaybackType, track: Song): PlaybackType => {
  return {
    ...state,
    currentSong: track,
    isPlaying: true,
  };
};

const handleSetTrack = (state: PlaybackType, newTrack: Song): PlaybackType => {
  // debugger;
  console.log("setting track, ", newTrack.name);
  const nextSong = nextTrack(state.currentCollection?.tracks, newTrack);
  const previousSong = previousTrack(state.currentCollection?.tracks, newTrack);

  const newState = {
    ...state,
    currentSong: newTrack,
    nextSong,
    previousSong,
  };
  if (!state.currentCollection?.tracks?.includes(newTrack)) {
    newState.currentCollection = undefined;
  }

  return newState;
};

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  let newState: PlaybackType;
  switch (action.type) {
    case "PLAY_COLLECTION":
      console.log(action.type);
      if (
        !action.payload.collection.tracks ||
        action.payload?.collection?.tracks?.length < 0
      )
        return state;
      newState = {
        ...initial,
        currentCollection: action.payload.collection,
        currentSong: action.payload.collection?.tracks[0],
        nextSong: action.payload.collection?.tracks[1],
        currentService: action.payload.collection?.tracks[0].service,
        nextService: action.payload.collection?.tracks[1]?.service,
        isPlaying: true,
      };
      return newState;
    case "PLAY_TRACK":
      return handlePlayTrack(state, action.payload.track);
    case "SET_TRACK":
      return handleSetTrack(state, action.payload.track);
    case "SET_NEXT":
      return handleSetNext(state);
    case "SONG_END":
      console.log(action.type);
      return {
        ...state,
        isFinished: true,
        isPlaying: false,
      };
    case "PLAYBACK_FINISH":
      return initial;
    case "PLAY":
      console.log(action.type);
      return handlePlay(state);
    case "PAUSE_CURRENT":
      console.log(action.type);
      return handlePause(state);
    case "PLAY_PREVIOUS":
      return handlePlayPrevious(state);
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "LOADING_FINISH":
      return {
        ...state,
        isLoading: false,
      };
    case "INITIALIZE":
      return {
        ...initial,
      };
    case "DELETE_COLLECTION":
      if (action.payload.id === state.currentCollection?.playlistInfo?.id) {
        return { ...initial };
      }
      return state;
    case "ADD_TO_QUEUE":
      debugger;
      if (!state.currentCollection?.tracks) return state;
      const newCollection = {
        ...state.currentCollection,
        tracks: [...state.currentCollection.tracks, ...action.payload.tracks],
      } as Collection;
      newState = {
        ...state,
        currentCollection: { ...newCollection },
      } as PlaybackType;
      console.log(action.type, newState);
      return newState;
    default:
      return state;
  }
};
