import { insertItemsToArray } from "../../helpers/utils";
import { Collection, Song, Tracks } from "../../types/types";
import { player as initial } from "../context";
import { ActionMap, PlaybackPayload, PlaybackType } from "../types";

export type PlaybackActions =
  ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const findIndexOfItems = <T extends { id: string | number }>(
  data: T[],
  itemToCheck: T
) => data.findIndex((item) => item.id === itemToCheck.id);

const nextTrack = (tracks?: Tracks, nextSong?: Song) => {
  if (!tracks || !nextSong) return;
  const index = findIndexOfItems(tracks, nextSong);
  if (index < 0) return;
  return tracks[index + 1];
};

const previousTrack = (tracks: Tracks, currentSong: Song) => {
  const index = findIndexOfItems(tracks, currentSong);
  if (index < 0) return;
  return tracks[index - 1];
};

const handlePlayPrevious = (state: PlaybackType) => {
  console.log("prev state: ", state);
  if (!state.previousSong || !state.currentCollection?.tracks) return state;
  const currentSong = state.previousSong;
  const nextSong = nextTrack(state.currentCollection?.tracks, currentSong);
  const previousSong = previousTrack(
    state.currentCollection.tracks,
    currentSong
  );
  if (findIndexOfItems(state.currentCollection.tracks, currentSong) === 0) {
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
  return newState;
};

const handleSetNext = (state: PlaybackType) => {
  if (
    state.nextSong == undefined ||
    state.currentCollection?.tracks == undefined
  ) {
    return state;
  }

  const currentSong = state.nextSong;
  const nextSong = nextTrack(state.currentCollection.tracks, currentSong);
  const previousSong = previousTrack(
    state.currentCollection?.tracks,
    currentSong
  );

  const newState = {
    ...state,
    currentSong,
    currentService: currentSong.service,
    nextSong,
    nextService: nextSong?.service,
    previousSong,
  };

  console.log("old state...: ", state);
  console.log("new state...: ", newState);
  return newState;
};

const handleSetTrack = (state: PlaybackType, newTrack: Song): PlaybackType => {
  if (!state.currentCollection?.tracks) return state;
  const nextSong = nextTrack(state.currentCollection?.tracks, newTrack);
  const previousSong = previousTrack(state.currentCollection.tracks, newTrack);
  const newState = {
    ...state,
    currentSong: newTrack,
    nextSong,
    previousSong,
  };
  if (
    !state.currentCollection?.tracks?.some((track) => track.id === newTrack.id)
  ) {
    newState.currentCollection = undefined;
  }
  return newState;
};

const handleAddToNext = (
  currentSong: Song,
  currentTracks: Tracks,
  tracks: Tracks
) => {
  const index = currentTracks.findIndex((track) => track.id === currentSong.id);
  const newTracks = insertItemsToArray(currentTracks, index, tracks);
  return newTracks;
};

export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
): PlaybackType => {
  let newState: PlaybackType;
  let newCollection: Collection;
  switch (action.type) {
    case "PLAY_COLLECTION":
      console.log(action.type);
      newState = {
        ...initial,
        currentCollection: action.payload.collection,
        currentSong: action.payload.collection?.tracks[0],
        nextSong: action.payload.collection?.tracks[1],
        currentService: action.payload.collection?.tracks[0].service,
        nextService: action.payload.collection?.tracks[1]?.service,
        isLoading: true,
        isPlaying: true,
      };
      return newState;
    case "PLAY_TRACK":
      return {
        ...state,
        currentSong: action.payload.track,
        isPlaying: true,
      };
    case "SET_TRACK":
      return handleSetTrack(state, action.payload.track);
    case "SET_NEXT":
      return handleSetNext(state);
    case "SONG_END":
      console.log(action.type);
      return {
        ...state,
        isFinished: true,
      };
    case "PLAYBACK_FINISH":
      return initial;
    case "PLAY":
      console.log(action.type);
      return { ...state, isPlaying: true, isFinished: false };
    case "PAUSE_CURRENT":
      console.log(action.type);
      return { ...state, isPlaying: false };
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
    case "ADD_TO_CURRENT_COLLECTION":
      if (!state.currentCollection?.tracks) return state;
      newCollection = {
        ...state.currentCollection,
        tracks: [...state.currentCollection.tracks, ...action.payload.tracks],
      };
      return {
        ...state,
        nextSong: action.payload.tracks[0],
        currentCollection: newCollection,
      };
    case "ADD_TO_NEXT":
      if (!state.currentCollection?.tracks || !state.currentSong) return state;
      newCollection = {
        ...state.currentCollection,
        tracks: handleAddToNext(
          state.currentSong,
          state.currentCollection.tracks,
          action.payload.tracks
        ),
      };
      return {
        ...state,
        nextSong: action.payload.tracks[0],
        currentCollection: newCollection,
      };
    case "DELETE_ITEM":
      if (!state.currentCollection?.tracks) return state;
      newCollection = {
        ...state.currentCollection,
        tracks: state.currentCollection?.tracks.filter(
          (track) => track.id !== action.payload.id
        ),
      };
      return {
        ...state,
        currentCollection: newCollection,
      };

    default:
      return state;
  }
};
