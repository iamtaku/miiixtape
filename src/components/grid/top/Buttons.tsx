import { faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { device } from "../../../globalStyle";
import { useIsCurrentPlaylist } from "../../../helpers/hooks";
import { useGlobalContext } from "../../../state/context";
import { Playlist } from "../../../types/types";
import { BasicButton } from "../../Buttons";
import { PlaybackButton } from "../../PlaybackButton";
import { Modal } from "../Modal";

interface ButtonsProps {
  data: Playlist;
}

interface IParam {
  service: string;
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Btn = styled(BasicButton)`
  margin-left: 8px;
  padding: 8px;
  min-width: 60px;
  span {
    display: none;
    margin-left: 8px;
  }

  @media ${device.laptop} {
    max-width: 60px;
    span {
      display: initial;
    }
  }
  @media ${device.tablet} {
    min-width: 90px;
  }
  @media ${device.laptopL} {
    min-width: 120px;
  }
`;

const GridButton = styled(PlaybackButton)`
  margin-left: 8px;
  padding: 8px;
  min-width: 60px;
  span {
    display: none;
    margin-left: 8px;
  }

  @media ${device.laptop} {
    max-width: 60px;
    span {
      display: initial;
    }
  }
  @media ${device.tablet} {
    min-width: 90px;
  }
  @media ${device.laptopL} {
    min-width: 120px;
  }
`;

const ImportButton = styled(Btn)`
  color: var(--secondary);
`;

const PlayButton = styled(GridButton)`
  color: var(--accent);
`;

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const { state, dispatch } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isCurrent, isPlaying } = useIsCurrentPlaylist(data);

  const { pathname } = useLocation();
  const params = useParams<IParam>();

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  if (data.tracks.length === 0) {
    return <p>No tracks</p>;
  }

  return (
    <ButtonWrapper>
      {params.service === "spotify" && (
        <ImportButton
          onClick={() => setIsModalOpen(!isModalOpen)}
          isPressed={isModalOpen}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>ADD</span>
        </ImportButton>
      )}
      <PlayButton playlist={data}>
        {isCurrent && isPlaying ? (
          <>
            <FontAwesomeIcon icon={faPause} />
            <span>PAUSE</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faPlay} />
            <span>PLAY</span>
          </>
        )}
      </PlayButton>

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} tracks={data.tracks} />
      )}
    </ButtonWrapper>
  );
};
