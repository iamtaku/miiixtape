import React from "react";
import styled from "styled-components";
import { FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdPlaylistAdd } from "react-icons/md";
import {
  useDeletePlaylistItem,
  useFetchSongCache,
} from "../../../queries/hooks";
import { useGlobalContext } from "../../../state/context";
import { Song } from "../../../types/types";
import { BaseParams } from "../../../queries/types";
import { useParams } from "react-router-dom";
import { useIsOwner } from "../../../helpers/hooks";

const DeleteButton = styled.button`
  background: none;
  border: none;
  margin-left: 8px;
  color: var(--secondary);
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  visibility: hidden;
  color: var(--secondary);
`;

const AddButton = styled.button`
  background: none;
  border: none;
  margin-right: 8px;
  color: var(--accent);
`;

const SubMenuContainer = styled.div`
  background: var(--light-gray);
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  const songCache = useFetchSongCache(track.id);
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
    <SubMenuContainer>
      <AddButton onClick={handleAddSongToQueue}>
        <MdPlaylistAdd />
      </AddButton>
      <AddButton onClick={handleAddPlaylistItem}>
        <FaPlus />
      </AddButton>
      <ExternalLink href={songCache?.href} target="_blank" rel="noreferrer">
        <FiExternalLink />
      </ExternalLink>
      {isOwner && (
        <DeleteButton onClick={handleDeletePlaylistItem}>
          <FaTrash />
        </DeleteButton>
      )}
    </SubMenuContainer>
  );
};
