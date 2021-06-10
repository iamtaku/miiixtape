import { useGlobalContext } from "../state/context";
import { Playlist } from "../types/types";

export const useIsCurrent = (
  playlist: Playlist
): { isCurrent: Boolean; isPlaying: Boolean } => {
  const { state } = useGlobalContext();
  const isCurrent =
    playlist.playlistInfo.id === state.player.currentPlaylist.playlistInfo.id;
  const isPlaying = state.player.isPlaying;
  return {
    isCurrent,
    isPlaying,
  };
};

// want to show the current PLAY/PAUSE button for each playlist/album page
// will show PAUSE IF current playlist/album is playing to PAUSE that playlist/album
// otherwise, will show PLAY to immediatly PLAY that playlist/album
// given a playlist, return whether that playlist is currently playing
// return a BOOLEAN on whether the given playlist is currently playing
