import { Song } from "../types/types";
import { Service } from "../types/types";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Types = "PLAY_PLAYLIST";

export type PlaybackPayload = {
  PLAY_PLAYLIST: {
    id: string;
    tracks: Song[];
  };
  SET_CURRENT_PLAYING: {
    id: number;
    tracks: Song[];
  };
  PAUSE_CURRENT: {};
};

export type PlaybackType = {
  currentPlaylist: Playlist;
  playlistSongs: Song[];
  previousSong?: Song;
  currentSong: Song;
  currentService: Service;
  nextSong?: Song;
  nextService?: Service;
  isPlaying: boolean;
  isFinished: boolean;
};

interface Playlist {
  name: string;
  description: string;
}
