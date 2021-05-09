import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Song, Service } from "../types/types";
import { playbackReducer, PlaybackActions } from "./reducers";
import { PlaybackType } from "./types";

type InitialStateType = {
  player: PlaybackType;
};

const song: Song = {
  name: "",
  service: "",
  uri: "",
  id: "",
  img: "",
};

const service: Service = "";

const player = {
  currentPlaylist: {
    name: "",
    description: "",
  },
  playlistSongs: [],
  previousSong: song,
  currentSong: song,
  currentService: service,
  nextSong: song,
  nextService: service,
  isPlaying: false,
  isFinished: false,
};

// const playlist: Playlist[] = [];

const initialState = {
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
