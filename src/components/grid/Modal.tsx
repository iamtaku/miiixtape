import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { PostPlaylistItems } from "../../queries/hooks/PostPlaylistItems";
import { Playlist, Tracks } from "../../types/types";

const ModalWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: -30%;
  background-color: var(--gray);
  border-radius: 25px;
  padding: 8px 24px;
  h3 {
    margin: 4px 0;
  }

  li {
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: var(--accent);
      border-radius: 4px;
    }
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  tracks: Tracks;
}

export const Modal: React.FC<ModalProps> = ({ setIsModalOpen, tracks }) => {
  const { data: playlists } = GetAllPlaylists();
  const mutation = PostPlaylistItems();
  const handleClick = (id: string) => {
    mutation.mutate({ id, tracks });
    setIsModalOpen(false);
  };
  return (
    <ModalWrapper>
      <h3>Select a Playlist...</h3>
      <ul>
        {playlists &&
          playlists.map((item) => {
            return (
              <li
                key={item.playlistInfo.id}
                onClick={() => handleClick(item.playlistInfo.id)}
              >
                <p>{item.playlistInfo.name}</p>
              </li>
            );
          })}
      </ul>
    </ModalWrapper>
  );
};
