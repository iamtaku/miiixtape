import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useGlobalContext } from "../../../state/context";
import { Playlist, Tracks } from "../../../types/types";
import { Modal } from "../Modal";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

  svg {
    margin-right: 8px;
  }
`;

interface ButtonsProps {
  data: Playlist;
}

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const { state, dispatch } = useGlobalContext();
  const params = useParams<{ service: string; id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPlaying = () => state.player.isPlaying;
  useEffect(() => {
    setIsModalOpen(false);
  }, [params]);

  const handlePlay = (id: string, tracks?: Tracks) => {
    if (isPlaying()) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }
    if (tracks) {
      dispatch({
        type: "PLAY_PLAYLIST",
        payload: {
          id,
          tracks,
        },
      });
    }
  };

  if (data.tracks === undefined) {
    return <p>No tracks</p>;
  }

  return (
    <ButtonWrapper>
      {params.service === "spotify" && (
        <ImportButton onClick={() => setIsModalOpen(!isModalOpen)}>
          IMPORT
        </ImportButton>
      )}
      <PlayButton onClick={() => handlePlay(data.playlistInfo.id, data.tracks)}>
        <FontAwesomeIcon icon={isPlaying() ? faPause : faPlay} />
        {isPlaying() ? "PAUSE" : "PLAY"}
      </PlayButton>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} tracks={data.tracks} />
      )}
    </ButtonWrapper>
  );
};
