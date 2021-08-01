import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { playbackReducer, PlaybackActions } from "./reducers/playbackReducer";
import { PlaybackType } from "./types";

type InitialStateType = {
  player: PlaybackType;
};

export const player: PlaybackType = {
  currentCollection: undefined,
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

export const initialState = {
  player,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PlaybackActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { player }: InitialStateType,
  action: PlaybackActions
) => ({
  player: playbackReducer(player, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
