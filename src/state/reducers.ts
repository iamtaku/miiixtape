import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions = ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];
export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  switch (action.type) {
    case "PLAY_PLAYLIST":
      console.log("reducer was called, play_playlist");
      return {
        ...state,
      };
  }
};
