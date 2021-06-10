import { faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { useIsCurrent } from "../../../helpers/hooks";
import { useGlobalContext } from "../../../state/context";
import { Playlist, Tracks } from "../../../types/types";
import { BasicButton } from "../../Buttons";
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

const ImportButton = styled(BasicButton)`
  color: var(--secondary);
`;

const PlayButton = styled(BasicButton)<{ isPressed?: Boolean }>`
  color: var(--accent);
  ${(props) =>
    props.isPressed
      ? `
background: var(--primary);
box-shadow: inset 20px 20px 60px #2d2d2d,
            inset -20px -20px 60px #3d3d3d; 
  `
      : `
   background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;

  `}
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
  const { isCurrent, isPlaying } = useIsCurrent(data);

  const { pathname } = useLocation();
  const params = useParams<IParam>();

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const handleOnClick = () => {
    if (isCurrent && isPlaying) {
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
      <PlayButton onClick={handleOnClick} isPressed={isCurrent && isPlaying}>
        {isCurrent && isPlaying ? (
          <>
            <FontAwesomeIcon icon={faPause} />
            PAUSE
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlay} />
            PLAY
          </>
        )}
      </PlayButton>

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} tracks={data.tracks} />
      )}
    </ButtonWrapper>
  );
};
