import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Song } from "../queries/types";
import { playbackReducer, PlaybackActions } from "./reducers";

interface Playlist {
  name: string;
  description: string;
}

type PlaybackType = {
  currentPlaylist: Playlist;
  playlistSongs: Song[];
  previousSong: Song;
  currentSong: Song;
  currentService: string;
  nextSong: Song;
  nextService: string;
  isPlaying: boolean;
  isFinished: boolean;
};

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

// const initialState = {
// player: {},
// };

const mainReducer = (
  { player }: InitialStateType,
  action: PlaybackActions
) => ({
  player: playbackReducer(player, action),
});

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<PlaybackActions>;
}>({
  state: initialState,
  dispatch: () => null,
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
