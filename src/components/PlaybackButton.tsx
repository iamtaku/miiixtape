import React from "react";
import styled from "styled-components";
import { Playlist } from "../types/types";
import { useGlobalContext } from "../state/context";
import { getPlaylist } from "../queries/plaaaylist-queries";
import { useGetUser } from "../queries/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useIsCurrent } from "../helpers/hooks";

const PlayButton = styled.button<{
  isPlaying?: Boolean;
  isActive?: Boolean;
  isPressed?: Boolean;
}>`
  /* position: absolute; */
  display: ${(props) => (props.isActive ? "show" : "none")};
  background: none;
  border: none;
  color: var(--accent);
  &:hover {
    cursor: pointer;
  }
`;
interface IProps {
  playlist: Playlist;
  isActive: Boolean;
}

export const PlaybackButton: React.FC<IProps> = ({ playlist, isActive }) => {
  const { data: user } = useGetUser();
  const { dispatch } = useGlobalContext();
  const { isPlaying, isCurrent } = useIsCurrent(playlist);

  const handlePlayback = async () => {
    // if (playlist.tracks.length > 0) {
    //   dispatch({
    //     type: "PLAY_PLAYLIST",
    //     payload: { playlist },
    //   });
    //   return;
    // }

    try {
      const params = {
        id: playlist.playlistInfo.id,
        service: playlist.playlistInfo.service,
      };
      const fullData = await getPlaylist(params, user);
      dispatch({
        type: "PLAY_PLAYLIST",
        payload: { playlist: fullData },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleClick = async () => {
    try {
      await handlePlayback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PlayButton onClick={() => handleClick()} isActive={isActive || isCurrent}>
      <FontAwesomeIcon icon={isPlaying && isCurrent ? faPause : faPlay} />
    </PlayButton>
  );
};
