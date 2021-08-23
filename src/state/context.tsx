import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { playbackReducer, PlaybackActions } from "./reducers/playbackReducer";
import { uiReducer, UIActions } from "./reducers/uiReducer";
import { PlaybackType, UIType } from "./types";

export const fetchVolume = (): number => {
  const local = window.localStorage.getItem("volume");
  if (local) return +local;
  return 50;
};

export type InitialStateType = {
  player: PlaybackType;
  ui: UIType;
};

export const player: PlaybackType = {
  playbackPosition: 0,
  previousSong: undefined,
  currentSong: undefined,
  currentService: undefined,
  nextSong: undefined,
  nextService: undefined,
  isPlaying: false,
  isFinished: false,
  isLoading: false,
};

export const ui: UIType = {
  isModalOpen: false,
  modalType: null,
  currentModalId: null,
  currentTrack: null,
  disabledSection: null,
};

export const initialState = {
  player,
  ui,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PlaybackActions | UIActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { player, ui }: InitialStateType,
  action: PlaybackActions | UIActions
) => ({
  player: playbackReducer(player, action as PlaybackActions),
  ui: uiReducer(ui, action as UIActions),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): {
  state: InitialStateType;
  dispatch: Dispatch<PlaybackActions | UIActions>;
} => useContext(AppContext);

export { AppContext, AppProvider };
