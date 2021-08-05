import { Song, Service, Collection } from "../types/types";

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
  IS_LOADING: {};
  LOADING_FINISH: {};
  INITIALIZE: {};
  DELETE_COLLECTION: { id: string };
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
  isLoading: boolean;
};

type ModalType = "ADD_MODAL" | "SHARE_MODAL" | null;

export type UIPayload = {
  OPEN_MODAL: {
    modalType: ModalType;
    currentModalId: string;
  };
  CLOSE_MODAL: {};
};

export type UIType = {
  isModalOpen: boolean;
  modalType: ModalType;
  currentModalId: string | null;
};
