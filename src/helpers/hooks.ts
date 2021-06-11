import { useEffect, useState } from "react";
import { useGlobalContext } from "../state/context";
import { Playlist } from "../types/types";

interface ICurrent {
  isCurrent: Boolean;
  isPlaying: Boolean;
}
export const useIsCurrentPlaylist = (playlist: Playlist): ICurrent => {
  const { state } = useGlobalContext();
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    playlist.playlistInfo.id === state.player.currentPlaylist.playlistInfo.id
      ? setIsCurrent(true)
      : setIsCurrent(false);
  }, [state, playlist]);

  useEffect(() => {
    if (isCurrent && state.player.isPlaying) {
      setIsPlaying(true);
    }

    if (!state.player.isPlaying && isCurrent) {
      setIsPlaying(false);
    }
  }, [state, isCurrent]);

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
