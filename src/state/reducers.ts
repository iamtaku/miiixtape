import { Song } from "../types/types";
import { ActionMap, PlaybackPayload, PlaybackType } from "./types";

export type PlaybackActions = ActionMap<PlaybackPayload>[keyof ActionMap<PlaybackPayload>];

const hasNextTrack = (tracks: Song[]) => (tracks[1] ? tracks[1] : undefined);
// tracks.length > 1;
export const playbackReducer = (
  state: PlaybackType,
  action: PlaybackActions
) => {
  switch (action.type) {
    case "PLAY_PLAYLIST":
      // console.log(useQuery)
      console.log(action.payload);
      return {
        ...state,
        playlistSongs: action.payload.tracks,
        currentSong: action.payload.tracks[0],
        nextSong: hasNextTrack(action.payload.tracks),
        currentService: action.payload.tracks[0].service,
        nextService: action.payload.tracks[1].service,
        isPlaying: true,
      };
    case "SONG_END":
      console.log("song has ended, called from reducer");
      return {
        ...state,
      };
    case "PLAY_NEXT":
      console.log("playing next song...", state.nextSong);
      return {
        ...state,
        currentSong: state.nextSong,
        nextService: "youtube",
      } as PlaybackType;
    default:
      return state;
  }
};
