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
import {
  useDeletePlaylist,
  useGetSinglePlaylist,
  useGetUser,
} from "../../../queries/hooks";
import { useGlobalContext } from "../../../state/context";
import { Collection } from "../../../types/types";
import { BasicButton } from "../../Buttons";
import { PlaybackButton } from "../../Buttons";
import { AddModal } from "../../modal/AddModal";
import { ShareModal } from "../../modal/ShareModal";

interface ButtonsProps {
  data: Collection;
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
  justify-content: space-around;
`;

const GridButton = styled(PlaybackButton)`
  ${buttonStyles}
`;

const AddButton = styled(Btn)`
  color: var(--accent);
`;

const ShareButton = styled(Btn)`
  color: var(--secibdart);
`;

const PlayButton = styled(GridButton)`
  color: var(--accent);
`;

const DeleteBtn = styled(Btn)`
  color: var(--secondary);
`;

const ImportBtn = styled(Btn)`
  color: var(--secondary);
`;

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  background-color: var(--light-gray);
  padding: 8px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;

  button {
    border-radius: 0px;
    background: transparent;
    margin-left: 0;
    box-shadow: none;
    padding: 4px;
  }
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

const DisabledWrapper = styled.div<{ isDisabled: boolean }>`
  ${(props) =>
    props.isDisabled
      ? ` opacity: 0.5
  button {
    cursor: not-allowed;
    pointer-events: none;
  }
  `
      : null}
`;

interface IDisabled {
  isDisabled: boolean;
}

const ImportButton = () => {
  return <ImportBtn>IMPORT</ImportBtn>;
};

const Disabled: React.FC<IDisabled> = ({ children, isDisabled }) => {
  return <DisabledWrapper isDisabled={isDisabled}>{children}</DisabledWrapper>;
};

const OptionsModal: React.FC<{
  handleClick: () => void;
  isModalOpen: boolean;
  handleShareClick: () => void;
  isShareModalOpen: boolean;
}> = ({ handleShareClick, isShareModalOpen, handleClick, isModalOpen }) => {
  const { data } = useGetSinglePlaylist();
  const { data: userInfo } = useGetUser();
  const isAuthorized = () => data?.playlistInfo.owner === userInfo?.user_id;
  return (
    <Wrapper>
      <Disabled isDisabled={!isAuthorized()}>
        <AddButton onClick={handleClick} isPressed={isModalOpen}>
          <FontAwesomeIcon icon={faPlus} />
          <span>ADD</span>
        </AddButton>
      </Disabled>
      {!isAuthorized() && <ImportButton />}
      <ShareButton onClick={handleShareClick} isPressed={isShareModalOpen}>
        <FontAwesomeIcon icon={faShare} />
        <span>SHARE</span>
      </ShareButton>
      <Disabled isDisabled={isAuthorized()}>
        <DeleteButton />
      </Disabled>
    </Wrapper>
  );
};

const OptionsBtn = styled(Btn)`
  color: var(--secondary);
`;

const OptionsButton: React.FC<{
  handleClick: () => void;
  isModalOpen: boolean;
  handleShareClick: () => void;
  isShareModalOpen: boolean;
}> = ({ handleClick, isModalOpen, handleShareClick, isShareModalOpen }) => {
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
        <OptionsModal
          handleClick={handleClick}
          isModalOpen={isModalOpen}
          handleShareClick={handleShareClick}
          isShareModalOpen={isShareModalOpen}
        />
      )}
    </OptionsBtn>
  );
};

export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { isCurrent, isPlaying } = useIsCurrentPlaylist(data);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (data.tracks.length === 0) {
      setIsModalOpen(true);
    }
  }, [data.tracks.length]);

  const openOrCloseModal = (state: boolean) => {
    const main = document.querySelector(".main")!;
    if (!main) return;
    state
      ? main.classList.remove("modal-open")
      : main.classList.add("modal-open");
  };
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    openOrCloseModal(isModalOpen);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(!isShareModalOpen);
    openOrCloseModal(isShareModalOpen);
  };

  return (
    <ButtonWrapper>
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
      <OptionsButton
        handleClick={handleClick}
        isModalOpen={isModalOpen}
        handleShareClick={handleShareClick}
        isShareModalOpen={isShareModalOpen}
      />
      {isModalOpen && (
        <AddModal handleClick={handleClick} id={data.playlistInfo.id} />
      )}
      {isShareModalOpen && <ShareModal handleClick={handleShareClick} />}
    </ButtonWrapper>
  );
};
