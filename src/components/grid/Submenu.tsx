import React from "react";
import styled, { keyframes } from "styled-components";
import { FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import { useDeletePlaylistItem, useGetTrack } from "../../queries/hooks";
import { useGlobalContext } from "../../state/context";
import { Song } from "../../types/types";
import { BaseParams } from "../../queries/types";
import { useParams } from "react-router-dom";
import { useIsOwner } from "../../helpers/hooks";

const slideIn = keyframes`
  from {
   transform: translateX(100%);
   opacity: 0;
  }

  to {
   transform: translateX(0%);
   opacity: 1;
  } 
`;

const Wrapper = styled.div`
  position: relative;
`;

const SubMenuContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  animation: ${slideIn} 0.2s ease-out;

  button {
    color: var(--white);

    &:hover {
      color: var(--accent);
    }
  }

  a {
    &:hover {
      color: var(--accent);
    }
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  margin-left: 8px;
`;

const OptionsButton = styled.button`
  place-self: center;
  background: none;
  border: none;
  visibility: hidden;
  color: var(--white);
  &:hover {
    color: var(--accent);
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  margin-right: 8px;
`;

const ExternalLink = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export const MenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <OptionsButton className="options" onClick={onClick}>
      <FaEllipsisH />
    </OptionsButton>
  );
};

export const SubMenu: React.FC<{ track: Song }> = ({ track }) => {
  const { dispatch, state } = useGlobalContext();
  const mutation = useDeletePlaylistItem();
  const { data: song } = useGetTrack(track);
  const { id: playlistId } = useParams<BaseParams>();
  const isOwner = useIsOwner(playlistId);

  const handleDeletePlaylistItem = () => {
    mutation.mutateAsync(track.id).then(() => {
      dispatch({ type: "DELETE_ITEM", payload: { id: track.id } });
      if (state.player?.currentSong?.id === track.id) {
        dispatch({
          type: "SONG_END",
          payload: {},
        });
        dispatch({
          type: "SET_NEXT",
          payload: {},
        });
        dispatch({
          type: "PLAY",
          payload: {},
        });
      }
    });
  };

  const handleAddPlaylistItem = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        modalType: "ADD_ITEM_MODAL",
        track: track,
      },
    });
  };

  const handleAddSongToQueue = () => {
    dispatch({ type: "ADD_TO_NEXT", payload: { tracks: [track] } });
  };

  return (
    <Wrapper>
      <SubMenuContainer>
        <AddButton onClick={handleAddSongToQueue} title={"Add to queue"}>
          <MdPlaylistAdd />
        </AddButton>
        <AddButton onClick={handleAddPlaylistItem} title={"Add to playlist"}>
          <FaPlus />
        </AddButton>
        <ExternalLink
          href={song?.href}
          target="_blank"
          rel="noreferrer"
          title={`Open Source in ${track.service}`}
        >
          <FiExternalLink />
        </ExternalLink>
        {isOwner && (
          <DeleteButton
            onClick={handleDeletePlaylistItem}
            title={"Delete Item"}
          >
            <FaTrash />
          </DeleteButton>
        )}
      </SubMenuContainer>
    </Wrapper>
  );
};
