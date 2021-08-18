import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useGetUser } from "../queries/hooks";
import { useGlobalContext } from "../state/context";
import { Collection, Song } from "../types/types";

interface ICurrent {
  isCurrent: boolean;
  isPlaying: boolean;
  collection?: Collection;
}
export const useIsCurrentPlaylist = (collection: Collection): ICurrent => {
  const { state } = useGlobalContext();
  const [isCurrent, setIsCurrent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (
      collection.playlistInfo.id ===
      state.player.currentCollection?.playlistInfo.id
    ) {
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
  }, [state, collection]);

  useEffect(() => {
    if (isCurrent && state.player.isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
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
  const [collection, setPlaylist] = useState<Collection | undefined>(undefined);

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
    state.player.currentCollection
      ? setPlaylist(state.player.currentCollection)
      : setPlaylist(undefined);
  }, [state]);

  return {
    isCurrent,
    isPlaying,
    collection,
  };
};

interface IEditable {
  isOwner: boolean;
  isEditable: boolean;
}

export const useIsOwner = (playlistId: string): IEditable => {
  const { data: userInfo } = useGetUser();
  const queryClient = useQueryClient();
  const currentPlaylist = queryClient.getQueryData<Collection>([
    "collection",
    playlistId,
  ]);
  if (!currentPlaylist) return { isOwner: false, isEditable: false };
  return {
    isOwner: currentPlaylist?.playlistInfo.owner === userInfo?.user_id,
    isEditable: currentPlaylist?.playlistInfo.isEditable,
  };
};
