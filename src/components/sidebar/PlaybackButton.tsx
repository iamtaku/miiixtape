import React from "react";
import styled from "styled-components";
import { Playlist } from "../../types/types";
import { useGlobalContext } from "../../state/context";
import { getPlaylist } from "../../queries/plaaaylist-queries";
import { useGetUser } from "../../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
const PlayButton = styled.button<{ isPlaying?: boolean }>`
  background: none;
  border: none;
  color: var(--accent);
  &:hover {
    cursor: pointer;
  }
`;

interface IProps {
  playlist: Playlist;
  isActive: boolean;
  isPlaying: boolean;
}

export const PlaybackButton: React.FC<IProps> = ({
  playlist,
  isActive,
  isPlaying,
}) => {
  const { data: user } = useGetUser();
  const { dispatch } = useGlobalContext();

  const handlePlayback = async () => {
    const params = {
      id: playlist.playlistInfo.id,
      service: playlist.playlistInfo.service,
    };

    if (isPlaying) {
      dispatch({ type: "PAUSE_CURRENT", payload: {} });
      return;
    }

    try {
      const fullData = await getPlaylist(params, user);
      dispatch({
        type: "PLAY_PLAYLIST",
        payload: { playlist: fullData },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleClick = async (data: Playlist) => {
    await handlePlayback();
  };

  if (!isActive) return null;

  return (
    <PlayButton onClick={() => handleClick(playlist)}>
      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
    </PlayButton>
  );
};
