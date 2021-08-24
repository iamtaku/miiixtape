import { Song, Service, Collection, Tracks } from "../types/types";

export type ActionMap<M extends { [index: string]: unknown }> = {
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
  SONG_END: Record<string, never>;
  SET_NEXT: Record<string, never>;
  PAUSE_CURRENT: Record<string, never>;
  PLAY: Record<string, never>;
  PLAY_PREVIOUS: Record<string, never>;
  PLAYBACK_FINISH: Record<string, never>;
  IS_LOADING: Record<string, never>;
  LOADING_FINISH: Record<string, never>;
  INITIALIZE: Record<string, never>;
  DELETE_COLLECTION: { id: string };
  ADD_TO_CURRENT_COLLECTION: {
    tracks: Tracks;
  };
  ADD_TO_NEXT: {
    tracks: Tracks;
  };
  DELETE_ITEM: {
    id: string;
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
  isLoading: boolean;
};

type ModalType =
  | "ADD_MODAL"
  | "SHARE_MODAL"
  | "ADD_ITEM_MODAL"
  | "IMPORT_MODAL"
  | null;

type Section = "SIDEBAR" | "TRACKS" | null;

export type UIPayload = {
  OPEN_MODAL: {
    modalType: ModalType;
    currentModalId?: string;
    track?: Song;
  };
  CLOSE_MODAL: Record<string, never>;
  DISABLE_DROP: {
    section: Section;
  };
  RESET_DROP: Record<string, never>;
};

export type UIType = {
  isModalOpen: boolean;
  modalType: ModalType;
  currentModalId: string | null;
  currentTrack: Song | null;
  disabledSection: Section;
};
