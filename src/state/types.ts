import { Song, Tracks, Service, Collection } from "../types/types";

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
  PLAY_COLLECTION: {
    collection: Collection;
  };
  PLAY_TRACK: {
    track: Song;
  };
  SET_TRACK: {
    track: Song;
  };
  SONG_END: {};
  SET_NEXT: {};
  PAUSE_CURRENT: {};
  PLAY: {};
  PLAY_PREVIOUS: {};
  PLAYBACK_FINISH: {};
  UPDATE_DURATION: {
    duration: number;
  };
};

export type PlaybackType = {
  currentCollection?: Collection;
  playbackPosition: number;
  previousSong?: Song;
  currentSong?: Song;
  currentService?: Service;
  nextSong?: Song;
  nextService?: Service;
  isPlaying: boolean;
  isFinished: boolean;
  duration: number;
};
