import { Song } from "../queries/types";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload?: M[Key];
      };
};

export type Types = "PLAY_PLAYLIST";

export type PlaybackPayload = {
  PLAY_PLAYLIST: {
    id: number;
    name: string;
  };
};

export type PlaybackType = {
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

interface Playlist {
  name: string;
  description: string;
}
