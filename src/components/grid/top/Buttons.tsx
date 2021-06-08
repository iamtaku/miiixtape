import { faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { useGlobalContext } from "../../../state/context";
import { Playlist, Tracks } from "../../../types/types";
import { Modal } from "../Modal";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  svg {
    margin-right: 8px;
  }
`;

const ImportButton = styled.button`
  background-color: transparent;
  padding: 8px 24px;
  color: var(--secondary);
  border: none;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  margin-right: 8px;
  &:hover {
    background: var(--secondary);
    color: var(--primary);
  }
`;

const PlayButton = styled.button`
  background-color: var(--accent);
  padding: 8px 24px;
  color: var(--accent);
  border: none;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  &:hover {
    background: var(--accent);
    color: var(--primary);
  }
`;

interface ButtonsProps {
  data: Playlist;
}

interface IParam {
  service: string;
}

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const { state, dispatch } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const params = useParams<IParam>();
  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const isCurrent = () =>
    state.player.currentPlaylist &&
    pathname.includes(state.player.currentPlaylist.playlistInfo.id);

  const handlePlay = () => {
    if (state.player.isPlaying && isCurrent()) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }

    dispatch({
      type: "PLAY_PLAYLIST",
      payload: {
        playlist: data,
      },
    });
  };

  if (data.tracks.length === 0) {
    return <p>No tracks</p>;
  }

  return (
    <ButtonWrapper>
      {params.service === "spotify" && (
        <ImportButton onClick={() => setIsModalOpen(!isModalOpen)}>
          <FontAwesomeIcon icon={faPlus} />
          ADD
        </ImportButton>
      )}
      <PlayButton onClick={handlePlay}>
        <FontAwesomeIcon
          icon={isCurrent() && state.player.isPlaying ? faPause : faPlay}
        />
        {isCurrent() && state.player.isPlaying ? "PAUSE" : "PLAY"}
      </PlayButton>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} tracks={data.tracks} />
      )}
    </ButtonWrapper>
  );
};
