import React, { useState, useRef } from "react";
import {
  FaEllipsisV,
  FaPause,
  FaPlay,
  FaPlus,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../../globalStyle";
import { useIsCurrentPlaylist, useIsOwner } from "../../helpers/hooks";
import { useDeletePlaylist } from "../../queries/hooks";
import { Collection, PlaylistParam } from "../../types/types";
import { BasicButton } from "../Buttons";
import { PlaybackButton } from "../Buttons";
import { useGlobalContext } from "../../state/context";

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const buttonStyles = css`
  padding: 8px;
  min-width: 60px;
  max-width: 140px;
  width: 100%;
  border-radius: 8px;
  span {
    display: none;
    margin-left: 8px;
  }

  @media ${device.laptop} {
    span {
      display: initial;
    }
  }
`;

const Btn = styled(BasicButton)`
  ${buttonStyles}
  justify-content: space-between;
`;

const GridButton = styled(PlaybackButton)`
  ${buttonStyles}
  border-radius: 8px;
`;

const AddButton = styled(Btn)`
  color: var(--accent);
`;

const ShareButton = styled(Btn)`
  color: var(--secondary);
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

const DropdownContainer = styled.div<IDropdownContainer>`
  position: absolute;
  top: ${(props) => (props.top ? `${props.top}px` : "default")};
  width: ${(props) => (props.width ? `${props.width}px` : "default")};
`;
const Wrapper = styled(DropdownContainer)`
  background-color: var(--light-gray);
  padding: 8px;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  z-index: 10;

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
  const { dispatch } = useGlobalContext();
  const { id } = useParams<PlaylistParam>();
  const handleClick = async () => {
    mutation
      .mutateAsync()
      .then(() => {
        dispatch({ type: "DELETE_COLLECTION", payload: { id } });
        history.push("/app");
      })
      .catch((err) => console.log(err));
  };
  return (
    <DeleteBtn onClick={handleClick}>
      <FaTrash />
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

const ImportButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <ImportBtn onClick={onClick}>
      <IoCopyOutline />
      IMPORT
    </ImportBtn>
  );
};

const Disabled: React.FC<{ isDisabled: boolean }> = ({
  children,
  isDisabled,
}) => {
  return <DisabledWrapper isDisabled={isDisabled}>{children}</DisabledWrapper>;
};

interface IDropdownContainer {
  top?: number;
  width?: number;
  handleOptionsClick?: () => void;
}

const OptionsDropdown: React.FC<IDropdownContainer> = ({
  top,
  width,
  handleOptionsClick,
}) => {
  const { dispatch } = useGlobalContext();
  const { id } = useParams<PlaylistParam>();
  const { isOwner, isEditable } = useIsOwner(id);

  const handleAddClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: "ADD_MODAL", currentModalId: id },
    });
    handleOptionsClick && handleOptionsClick();
  };

  const handleShareClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: "SHARE_MODAL", currentModalId: id },
    });
    handleOptionsClick && handleOptionsClick();
  };

  const handleImportClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: "IMPORT_MODAL", currentModalId: id },
    });
    handleOptionsClick && handleOptionsClick();
  };

  return (
    <Wrapper top={top} width={width}>
      <Disabled isDisabled={isOwner}>
        {(isEditable || isOwner) && (
          <AddButton onClick={handleAddClick}>
            <FaPlus />
            <span>ADD</span>
          </AddButton>
        )}
      </Disabled>
      <ImportButton onClick={handleImportClick} />
      <ShareButton onClick={handleShareClick}>
        <FaShare />
        <span>SHARE</span>
      </ShareButton>
      {isOwner && <DeleteButton />}
    </Wrapper>
  );
};

const OptionsBtn = styled(Btn)`
  color: var(--secondary);
`;

const OptionsButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const handleOptionsClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <div style={{ position: "relative" }}>
      <OptionsBtn onClick={handleOptionsClick} ref={ref}>
        <FaEllipsisV />
        <span>OPTIONS</span>
      </OptionsBtn>
      {isOptionsOpen && (
        <OptionsDropdown
          top={ref.current?.clientHeight}
          width={ref.current?.clientWidth}
          handleOptionsClick={handleOptionsClick}
        />
      )}
    </div>
  );
};

const PauseBtn = () => {
  return (
    <FaPause>
      <span>PAUSE</span>
    </FaPause>
  );
};

const PlayBtn = () => (
  <FaPlay>
    <span>PLAY</span>
  </FaPlay>
);

interface ButtonsProps {
  data: Collection;
}
export const Buttons: React.FC<ButtonsProps> = ({ data }) => {
  const { isCurrent, isPlaying } = useIsCurrentPlaylist(data);
  const isCurrentAndIsPlaying = isCurrent && isPlaying;

  return (
    <ButtonWrapper>
      <PlayButton data={data}>
        {isCurrentAndIsPlaying ? <PauseBtn /> : <PlayBtn />}
      </PlayButton>
      <OptionsButton />
    </ButtonWrapper>
  );
};
