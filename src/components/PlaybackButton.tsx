import React from "react";
import styled from "styled-components";
import { Playlist } from "../types/types";
import { useGlobalContext } from "../state/context";
import { getPlaylist } from "../queries/plaaaylist-queries";
import { useGetUser } from "../queries/hooks";
import { useIsCurrentPlaylist } from "../helpers/hooks";
import { useQueryClient } from "react-query";

interface IProps {
  playlist: Playlist;
}

const Button = styled.button`
  border: none;
  background: transparent;
`;

export const PlaybackButton: React.FC<IProps & { className?: string }> = ({
  playlist,
  children,
  className,
}) => {
  const { data: user } = useGetUser();
  const { dispatch } = useGlobalContext();
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(playlist);
  const queryClient = useQueryClient();

  const handlePlayback = async (playlist: Playlist) => {
    let cache = queryClient.getQueryData<Playlist>([
      "playlist",
      { id: playlist.playlistInfo.id, service: playlist.playlistInfo.service },
    ]);

    if (isCurrent && isPlaying) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }

    if (isCurrent && !isPlaying) {
      dispatch({
        type: "PLAY",
        payload: {},
      });
      return;
    }

    if (!cache) {
      try {
        const params = {
          id: playlist.playlistInfo.id,
          service: playlist.playlistInfo.service,
        };
        cache = await getPlaylist(params, user);
      } catch (err) {
        throw new Error(err);
      }
    }

    dispatch({
      type: "PLAY_PLAYLIST",
      payload: {
        playlist: cache,
      },
    });
  };

  const handleClick = async (playlist: Playlist) => {
    try {
      await handlePlayback(playlist);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={() => handleClick(playlist)} className={className}>
      {children}
    </Button>
  );
};
