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
`;

interface ButtonsProps {
  data: Playlist;
}

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const { dispatch } = useGlobalContext();
  const params = useParams<{ service: string; id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [params]);

  const handlePlay = (id: string, tracks?: Tracks) => {
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
        PLAY
      </PlayButton>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} tracks={data.tracks} />
      )}
    </ButtonWrapper>
  );
};
