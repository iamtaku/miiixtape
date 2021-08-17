import {
  FaEllipsisV,
  FaPause,
  FaPlay,
  FaPlus,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "../../globalStyle";
import { useIsCurrentPlaylist, useIsOwner } from "../../helpers/hooks";
import { useDeletePlaylist } from "../../queries/hooks";
import { Collection, PlaylistParam } from "../../types/types";
import { BasicButton } from "../Buttons";
import { PlaybackButton } from "../Buttons";
import { useGlobalContext } from "../../state/context";
import { useRef } from "react";

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
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
    /* max-width: 60px; */
    span {
      display: initial;
    }
  }
  @media ${device.tablet} {
    /* min-width: 90px; */
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
  border-radius: 8px;
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

const ImportButton = () => {
  return <ImportBtn>IMPORT</ImportBtn>;
};

interface IDisabled {
  isDisabled: boolean;
}

const Disabled: React.FC<IDisabled> = ({ children, isDisabled }) => {
  return <DisabledWrapper isDisabled={isDisabled}>{children}</DisabledWrapper>;
};

interface IDropdownContainer {
  top?: number;
  width?: number;
}

const OptionsDropdown: React.FC<IDropdownContainer> = ({ top, width }) => {
  const { dispatch } = useGlobalContext();
  const { id } = useParams<PlaylistParam>();
  const isOwner = useIsOwner(id);

  const handleAddClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: "ADD_MODAL", currentModalId: id },
    });
  };

  const handleShareClick = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: "SHARE_MODAL", currentModalId: id },
    });
  };
  return (
    <Wrapper top={top} width={width}>
      <Disabled isDisabled={isOwner}>
        <AddButton onClick={handleAddClick}>
          <FaPlus />
          <span>ADD</span>
        </AddButton>
      </Disabled>
      {isOwner && <ImportButton />}
      <ShareButton onClick={handleShareClick}>
        <FaShare />
        <span>SHARE</span>
      </ShareButton>
      <Disabled isDisabled={isOwner}>
        <DeleteButton />
      </Disabled>
    </Wrapper>
  );
};

const OptionsBtn = styled(Btn)`
  color: var(--secondary);
`;

const OptionsButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const handleOptionsClick = () => {
    console.log("open options");
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <OptionsBtn onClick={handleOptionsClick}>
        <FaEllipsisV />
        <span>OPTIONS</span>
      </OptionsBtn>
      {isOptionsOpen && (
        <OptionsDropdown
          top={ref.current?.clientHeight}
          width={ref.current?.clientWidth}
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
