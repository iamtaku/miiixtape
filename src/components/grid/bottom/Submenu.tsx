import React from "react";
import styled from "styled-components";
import { FaEllipsisH, FaPlus, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import {
  useDeletePlaylistItem,
  useFetchSongCache,
} from "../../../queries/hooks";
import { useGlobalContext } from "../../../state/context";
import { Song } from "../../../types/types";

export const Submenu = () => {
  return <div></div>;
};

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--red);
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
  color: var(--accent);
`;

interface ISubMenu {
  offsetX?: boolean;
  offsetY?: boolean;
  offsetXWidth?: number;
  offsetYWidth?: number;
}

const SubMenuContainer = styled.div<ISubMenu>`
  background: var(--primary);
  height: 40px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const MenuButton: React.FC<{ track: Song; onClick: () => void }> = ({
  track,
  onClick,
}) => {
  return (
    <OptionsButton className="options" onClick={onClick}>
      <FaEllipsisH />
    </OptionsButton>
  );
};

export const SubMenu2: React.FC<{ track: Song }> = ({ track }) => {
  const { dispatch, state } = useGlobalContext();
  const mutation = useDeletePlaylistItem();
  const songCache = useFetchSongCache(track.id);

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

  return (
    <SubMenuContainer>
      <a href={songCache?.href} target="_blank" rel="noreferrer">
        <FiExternalLink />
      </a>
      <DeleteButton onClick={handleDeletePlaylistItem}>
        <FaTrash />
      </DeleteButton>
      <AddButton onClick={handleAddPlaylistItem}>
        <FaPlus />
      </AddButton>
    </SubMenuContainer>
  );
};
