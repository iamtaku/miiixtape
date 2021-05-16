import { Song, Tracks } from "../types/types";
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

export type PlaybackPayload = {
  PLAY_PLAYLIST: {
    id: string;
    tracks: Tracks;
  };
  SONG_END: {};
  PLAY_NEXT: {};
  PAUSE_CURRENT: {};
  PLAY: {};
  PLAY_PREVIOUS: {};
};

export type PlaybackType = {
  currentPlaylist: Playlist;
  playlistTracks?: Tracks;
  playbackPosition: number;
  previousSong?: Song;
  currentSong?: Song;
  currentService?: Service;
  nextSong?: Song;
  nextService?: Service;
  isPlaying: boolean;
  isFinished: boolean;
};

interface Playlist {
  name: string;
  description: string;
}
