import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Song } from "../queries/types";
import { playbackReducer, PlaybackActions } from "./reducers";
import { PlaybackType } from "./types";

interface Playlist {
  name: string;
  description: string;
}

type InitialStateType = {
  player: PlaybackType;
};

const song = {
  name: "",
  service: "",
  uri: "",
  id: "",
  img: "",
};

// const playlist: Playlist[] = [];

const initialState = {
  player: {
    currentPlaylist: {
      name: "",
      description: "",
    },
    playlistSongs: [],
    previousSong: song,
    currentSong: song,
    currentService: "",
    nextSong: song,
    nextService: "",
    isPlaying: false,
    isFinished: false,
  },
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
