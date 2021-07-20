import {
  faEllipsisV,
  faPause,
  faPlay,
  faPlus,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import styled, { css } from "styled-components";
import { device } from "../../../globalStyle";
import { useIsCurrentPlaylist } from "../../../helpers/hooks";
import { useDeletePlaylist } from "../../../queries/hooks";
import { useGlobalContext } from "../../../state/context";
import { Collection } from "../../../types/types";
import { BasicButton } from "../../Buttons";
import { PlaybackButton } from "../../Buttons";
import { Modal } from "../../modal";

interface ButtonsProps {
  data: Collection;
}

interface IParam {
  service: string;
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const buttonStyles = css`
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

const Btn = styled(BasicButton)`
  ${buttonStyles}
`;

const GridButton = styled(PlaybackButton)`
  ${buttonStyles}
`;

const ImportButton = styled(Btn)`
  color: var(--accent);
`;

const PlayButton = styled(GridButton)`
  color: var(--accent);
`;

const DeleteBtn = styled(Btn)`
  color: var(--secondary);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  background-color: var(--light-gray);
  padding: 8px;
`;

const DeleteButton = () => {
  const mutation = useDeletePlaylist();
  const history = useHistory();
  const { state, dispatch } = useGlobalContext();
  const handleClick = async () => {
    mutation
      .mutateAsync()
      .then(() => {
        // dispatch({ type: "PLAYBACK_FINISH", payload: {} });
        history.push("/app");
      })
      .catch((err) => console.log(err));
  };
  return (
    <DeleteBtn onClick={handleClick}>
      <FontAwesomeIcon icon={faTrash} />
      <span>DELETE</span>
    </DeleteBtn>
  );
};

const ShareButton = () => {
  const handleClick = () => {};
  return (
    <DeleteBtn onClick={handleClick}>
      <FontAwesomeIcon icon={faShare} />
      <span>SHARE</span>
    </DeleteBtn>
  );
};

const OptionsModal: React.FC<{
  handleClick: () => void;
  isModalOpen: boolean;
}> = ({ handleClick, isModalOpen }) => {
  return (
    <Wrapper>
      <ImportButton onClick={handleClick} isPressed={isModalOpen}>
        <FontAwesomeIcon icon={faPlus} />
        <span>ADD</span>
      </ImportButton>
      <ShareButton />
      <DeleteButton />
    </Wrapper>
  );
};

const OptionsBtn = styled(Btn)`
  color: var(--secondary);
`;

const OptionsButton: React.FC<{
  handleClick: () => void;
  isModalOpen: boolean;
}> = ({ handleClick, isModalOpen }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleOptionsClick = () => {
    console.log("open options");
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <OptionsBtn onClick={handleOptionsClick} style={{ position: "relative" }}>
      <FontAwesomeIcon icon={faEllipsisV} />
      <span>OPTIONS</span>
      {isOptionsOpen && (
        <OptionsModal handleClick={handleClick} isModalOpen={isModalOpen} />
      )}
    </OptionsBtn>
  );
};

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isCurrent, isPlaying } = useIsCurrentPlaylist(data);

  const { pathname } = useLocation();
  const params = useParams<IParam>();

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const openOrCloseModal = () => {
    const main = document.querySelector(".main")!;
    if (!main) return;
    isModalOpen
      ? main.classList.remove("modal-open")
      : main.classList.add("modal-open");
  };
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    openOrCloseModal();
  };

  return (
    <ButtonWrapper>
      {/* {params.service === "spotify" && ( */}
      {/* )} */}
      <PlayButton data={data}>
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
      <OptionsButton handleClick={handleClick} isModalOpen={isModalOpen} />
      {isModalOpen && (
        <Modal handleClick={handleClick} id={data.playlistInfo.id} />
      )}
      {/* <Btn style={{ color: 'var(--accent)' }}><FontAwesomeIcon icon={faShare} />SHARE</Btn> */}
    </ButtonWrapper>
  );
};
