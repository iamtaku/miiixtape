import React, { createContext, useContext, useReducer } from "react";
import { Song } from "../queries/types";

interface Playlist {
  name: string;
  description: string;
}

type InitialStateType = {
  currentPlaylist: Playlist;
  playlistSongs: Song[];
  previousSong: Song;
  currentSong: Song;
  currentService: string;
  nextSong: Song;
  nextService: string;
  isPlaying: boolean;
};

const song = {
  name: "",
  service: "",
  uri: "",
  id: "",
  img: "",
};

const initialState = {
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
};

const mainReducer = ({ player }: InitialStateType, action: PlayerActions) => ({
  player: playerReducer(player, action),
});

const AppContext = createContext<InitialStateType>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

// export { AppContext, AppProvider };
