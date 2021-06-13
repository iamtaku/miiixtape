import { useEffect, useState } from "react";
import { useGlobalContext } from "../state/context";
import { Playlist, Song } from "../types/types";

interface ICurrent {
  isCurrent: Boolean;
  isPlaying: Boolean;
  playlist?: Playlist;
}
export const useIsCurrentPlaylist = (playlist: Playlist): ICurrent => {
  const { state } = useGlobalContext();
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    playlist.playlistInfo.id === state.player.currentPlaylist?.playlistInfo.id
      ? setIsCurrent(true)
      : setIsCurrent(false);
  }, [state, playlist]);

  useEffect(() => {
    isCurrent && state.player.isPlaying
      ? setIsPlaying(true)
      : setIsPlaying(false);
  }, [state, isCurrent]);

  return {
    isCurrent,
    isPlaying,
  };
};

export const useIsCurrentTrack = (track?: Song): ICurrent => {
  const { state } = useGlobalContext();
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

  useEffect(() => {
    if (!track) return;
    track.id === state.player.currentSong?.id
      ? setIsCurrent(true)
      : setIsCurrent(false);
  }, [state, track]);

  useEffect(() => {
    isCurrent && state.player.isPlaying
      ? setIsPlaying(true)
      : setIsPlaying(false);
  }, [state, isCurrent]);

  useEffect(() => {
    state.player.currentPlaylist
      ? setPlaylist(state.player.currentPlaylist)
      : setPlaylist(undefined);
  }, [state]);

  return {
    isCurrent,
    isPlaying,
    playlist,
  };
};
